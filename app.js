const express = require("express");
const schedule = require("node-schedule");
const fileController = require("./controllers/FileController");

const app = express();
app.use(express.json());

// API Route for manual file conversion (if needed)
const fileRoutes = require("./routes/FileRoutes");
app.use("/files", fileRoutes);

const workspaceID = "00000000-0000-0000-0000-000000000000"; // Power BI Workspace ID
const datasetName = "Dataset Name"; // Dataset name in Power BI

// Schedule conversion at 2 AM every day
schedule.scheduleJob("0 2 * * *", () => {
  console.log("Scheduled Conversion Triggered");
  const mppFilePath = "./files/mppFiles/Master Sample (1).mpp"; // Example .MPP file path
  fileController.handleFileConversion(mppFilePath, workspaceID, datasetName);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
