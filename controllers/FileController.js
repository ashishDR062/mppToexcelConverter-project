const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
// const { uploadFileToPowerBI } = require("../powerbi");

// Function to call Java code and convert .MPP to .xlsx/.csv

const path_to_mpxj_jar =
  "../lib/mpxj-13.4.0.jar:../lib/poi-ooxml-5.2.3.jar:../lib/poi-5.2.3.jar";

const convertMppToExcel = (mppFilePath, outputDirectory) => {
  console.log("Converting From MPP to Excel...", mppFilePath, outputDirectory);
  return new Promise((resolve, reject) => {
    const javaFile = path.join(
      __dirname,
      "../java/mpp-to-excel/src/main/java/com/mpp/converter/MppToExcel.java"
    ); // Java file location
    const outputFilePath = path.join(outputDirectory, "output.xlsx"); // Output path
    console.log("File File For Save: ", outputFilePath);
    // const command = `java -cp ${path_to_mpxj_jar} ${javaFile} ${mppFilePath} ${outputFilePath}`;

    const command = `java -cp ${path_to_mpxj_jar} ${javaFile} ${mppFilePath} ${outputFilePath}`;

    console.log("command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
        return reject();
      }
      resolve(outputFilePath);
    });
  });
};

// Function to create a dynamic directory
const createDynamicDirectory = (fileType) => {
  console.log("Initiating to create New Directory...");
  const baseDir = path.join(__dirname, "../files");
  const targetDir = path.join(baseDir, fileType);

  console.log("checking if directory is present...");

  if (!fs.existsSync(targetDir)) {
    console.log("Directory is not present, Creating New Directory...");

    fs.mkdirSync(targetDir, { recursive: true });
  }

  return targetDir;
};

// Function to compress the file
const compressFile = (inputFilePath, outputFilePath) => {
  const gzip = zlib.createGzip();
  const input = fs.createReadStream(inputFilePath);
  const output = fs.createWriteStream(outputFilePath);

  input.pipe(gzip).pipe(output);
};

// Example: Convert .MPP and compress the result
// Handle file conversion and Power BI upload
const handleFileConversion = async (mppFilePath) => {
  try {
    const outputDirectory = createDynamicDirectory("excel");
    console.log("Output Directory: ", outputDirectory);
    const outputFile = await convertMppToExcel(mppFilePath, outputDirectory);

    // Optional: Compress file
    const compressedPath = path.join(outputDirectory, "output.zip");
    console.log("Compression of the file is done :", compressedPath);
    compressFile(outputFile, compressedPath);

    // // After successful conversion, upload to Power BI
    // const workspace_id = workspaceID; // Power BI Workspace ID
    // const dataset_name = datasetName; // Dataset name in Power BI
    // await uploadFileToPowerBI(workspace_id, dataset_name, outputFile);

    // console.log("File uploaded to Power BI successfully.");
  } catch (error) {
    console.error("Error during file conversion/upload:", error);
  }
};

module.exports = { handleFileConversion };
