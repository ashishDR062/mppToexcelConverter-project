const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { uploadFileToPowerBI } = require("../powerbi");

// Function to call Java code and convert .MPP to .xlsx/.csv

const path_to_mpxj_jar = "path_to_mpxj_jar";

const convertMppToExcel = (mppFilePath, outputDirectory) => {
  return new Promise((resolve, reject) => {
    const javaFile = path.join(__dirname, "../java/MppToExcel.java"); // Java file location
    const outputFilePath = path.join(outputDirectory, "output.xlsx"); // Output path
    const command = `java -cp ${path_to_mpxj_jar} ${javaFile} ${mppFilePath} ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(outputFilePath);
    });
  });
};

// Function to create a dynamic directory
const createDynamicDirectory = (fileType) => {
  const baseDir = path.join(__dirname, "../files");
  const targetDir = path.join(baseDir, fileType);

  if (!fs.existsSync(targetDir)) {
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
    const outputFile = await convertMppToExcel(mppFilePath, outputDirectory);

    // Optional: Compress file
    const compressedPath = path.join(outputDirectory, "output.zip");
    compressFile(outputFile, compressedPath);

    // After successful conversion, upload to Power BI
    const workspaceId = "your-workspace-id"; // Power BI Workspace ID
    const datasetName = "Converted Dataset"; // Dataset name in Power BI
    await uploadFileToPowerBI(workspaceId, datasetName, outputFile);

    console.log("File uploaded to Power BI successfully.");
  } catch (error) {
    console.error("Error during file conversion/upload:", error);
  }
};

module.exports = { handleFileConversion };
