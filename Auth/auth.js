// const msal = require("@azure/msal-node");

// Azure AD OAuth2 configuration
const config = {
  auth: {
    clientId: process.env.CLIENT_ID, // Application (client) ID
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`, // Directory (tenant) ID
    clientSecret: process.env.CLIENT_SECRET, // Client secret value
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      // logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create MSAL ConfidentialClientApplication
// const pca = new msal.ConfidentialClientApplication(config);

// Function to get access token
const getAccessToken = async () => {
  const tokenRequest = {
    scopes: ["https://analysis.windows.net/powerbi/api/.default"],
  };

  try {
    const response = await pca.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error("Error acquiring access token:", error);
    throw error;
  }
};

module.exports = { getAccessToken };
