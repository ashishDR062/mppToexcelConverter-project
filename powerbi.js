const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { getAccessToken } = require("./Auth/auth");

// Function to upload .xlsx/.csv file to Power BI workspace
const uploadFileToPowerBI = async (workspaceId, datasetName, filePath) => {
  try {
    // Step 1: Get Access Token
    const accessToken = await getAccessToken();

    // Step 2: Define the Power BI REST API endpoint
    const url = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/imports?datasetDisplayName=${datasetName}&nameConflict=Overwrite`;

    // Step 3: Read the file you want to upload
    const fileContent = fs.readFileSync(filePath);

    // Step 4: Send POST request to upload the file
    const response = await axios.post(url, fileContent, {
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file to Power BI:", error);
    throw error;
  }
};

module.exports = { uploadFileToPowerBI };
