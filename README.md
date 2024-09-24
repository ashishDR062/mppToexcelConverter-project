# mppToexcelConverter-project

Coverts mpp file to excel with automation, with java to convert he file and I/O operations with node express.

Project Name: MPP to Excel File Conversion
Description: This project automates the conversion of .MPP (Microsoft Project) files to .xlsx (Excel), with support for compression and scheduled tasks.

Key Features:

- Manual and scheduled .MPP to .xlsx conversion
- Dynamic folder creation based on file types
- File compression (optional)
- Java integration for .MPP to .xlsx conversion
- REST API for triggering conversions

Directory Structure:

- controllers/: Contains logic for file conversion and compression
- models/: (Optional) To store metadata or database models
- routes/: Contains API routes for manual file conversion
- java/: Contains Java code for MPP to Excel conversion
- files/: Directory for storing uploaded and converted files
- views/: (Optional) For frontend rendering if needed

# File Name: app.js

Description: This is the main entry point of the Node.js application. It sets up the Express server, defines routes, and schedules automated tasks.

Key Features:

- Initializes the Express server.
- Defines the API routes for file conversion.
- Sets up a scheduled job (e.g., converts .MPP files to .xlsx every day at 2 AM).
- Logs server startup and scheduling events.

Commands to Run:

- `node app.js`: Starts the server and scheduling tasks.

# File Name: package.json

Description: This file contains metadata about the project and manages the Node.js dependencies required for running the application.

Key Fields:

- `name`: Project name.
- `version`: Version of the application.
- `dependencies`: Lists all Node.js libraries used in the project (e.g., Express, node-schedule, zlib).

Commands to Install Dependencies:

- `npm install`: Installs all required dependencies listed in `package.json`.
