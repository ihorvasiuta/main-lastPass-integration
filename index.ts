// index.ts

// Import the required modules
const request = require('request');
const winston = require('winston');
const { Client } = require('pg');
require('dotenv').config();

// Set up the logger using the winston module
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Set up the PostgreSQL client using the pg module
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD, 
  database: "mainlastpassintegration"
});

// Define an async function to get user data from the LastPass API
async function getLastPassUserData(username) {
  // Set up the options for the API request
  const options = {
    method: 'POST',
    url: 'https://lastpass.com/enterpriseapi.php',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "cid": process.env.LASTPASS_CID,
      "provhash": process.env.LASTPASS_PROVHASH,
      "cmd": "getuserdata",
      "data": {
        "username": username
      }
    })
  };

  try {
    // Make the API request and parse the response
    const response = await new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          logger.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);
          reject(error);
        }
        resolve(JSON.parse(body));
      });
    });
    logger.info(`Successfully retrieved data for user ${username}`);
    return response;
  } catch (error) {
    logger.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);
    throw error;
  }
}

// Define an async function to store user data in the PostgreSQL database
async function storeUserDataInDatabase(userData) {
  try {
    // Connect to the database
    await client.connect();
    // Set up the INSERT query and values
    const query = `INSERT INTO secondtable (username, last_login, sites, last_pw_change) VALUES ($1, $2, $3, $4)`;
    const userId = Object.keys(userData.Users)[0];
    const user = userData.Users[userId];
    const values = [user.username, user.last_login, user.sites, user.last_pw_change];
    // Run the INSERT query
    await client.query(query, values);
    logger.info(`Successfully stored data in database`);
  } catch (error) {
    logger.error(`An error occurred while storing data in the database: ${error}`);
    throw error;
  } finally {
    // Disconnect from the database
    await client.end();
  }
}

// Define an async main function to run the script
async function main() {
  try {
    // Get user data from the LastPass API
    const userData = await getLastPassUserData(process.env.LASTPASS_USERNAME);
    // Log the user data to the console for debugging purposes
    console.log(userData);
    // Store the user data in the PostgreSQL database
    await storeUserDataInDatabase(userData);
  } catch (error) {
    logger.error(`An error occurred while running the script: ${error}`);
  }
}

// Run the main function to start the script
main();
