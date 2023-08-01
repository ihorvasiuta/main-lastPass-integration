const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const winston = require('winston');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
  ],
});


async function getAndStoreLastPassEvents() {
  try {
    const response = await axios.post('https://lastpass.com/enterpriseapi.php', {
      cid: process.env.LASTPASS_CID,
      provhash: process.env.LASTPASS_PROVHASH,
      cmd: 'reporting',
      data: {
        from: '2023-07-01 00:00:00',
        to: '2023-07-31 23:59:59'
      }
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Failed to retrieve event data: ${response.data}`);
    }

    for (const key in response.data.data) {
      const eventData = response.data.data[key];
      await prisma.event.create({
        data: {
          event_time: new Date(eventData.Time),
          username: eventData.Username,
          ip_address: eventData.IP_Address,
          action: eventData.Action,
          data: eventData.Data,
          created_at: new Date()
        }
      });
    }

    logger.info(`Successfully stored event data in database`);
  } catch (error) {
    logger.error(`An error occurred while retrieving and storing event data: ${error}`);
  }
}

async function main() {
  try {
    // Get event data from the LastPass API and store it in the database
    await getAndStoreLastPassEvents();
  } catch (error) {
    logger.error(`An error occurred while running the script: ${error}`);
  }
}

main();





// // index.ts

// // Import the required modules
// const request = require('request');
// const winston = require('winston');
// const { Client } = require('pg');
// require('dotenv').config();

// // Set up the logger using the winston module
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console()
//   ]
// });

// // Set up the PostgreSQL client using the pg module
// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: process.env.DB_PASSWORD, 
//   database: "mainlastpassintegration"
// });

// // Define an async function to get user data from the LastPass API
// async function getLastPassUserData(username) {
//   // Set up the options for the API request
//   const options = {
//     method: 'POST',
//     url: 'https://lastpass.com/enterpriseapi.php',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "cid": process.env.LASTPASS_CID,
//       "provhash": process.env.LASTPASS_PROVHASH,
//       "cmd": "getuserdata",
//       "data": {
//       }
//     })
//   };

//   try {
//     // Make the API request and parse the response
//     const response = await new Promise((resolve, reject) => {
//       request(options, function (error, response, body) {
//         if (error) {
//           logger.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);   //
//           reject(error);
//         }
//         resolve(JSON.parse(body));
//       });
//     });
//     logger.info(`Successfully retrieved data for user ${username}`);
//     return response;
//   } catch (error) {
//     logger.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);
//     throw error;
//   }
// }

// // Define an async function to store user data in the PostgreSQL database
// async function storeUserDataInDatabase(userData) {
//   try {
//     // Connect to the database
//     await client.connect();
//     // Set up the INSERT query and values
//     const query = `INSERT INTO secondtable (username, last_login, sites, last_pw_change) VALUES ($1, $2, $3, $4)`;
//     const userId = Object.keys(userData.Users)[0];
//     const user = userData.Users[userId];
//     const values = [user.username, user.last_login, user.sites, user.last_pw_change];
//     // Run the INSERT query
//     await client.query(query, values);
//     logger.info(`Successfully stored data in database`);
//   } catch (error) {
//     logger.error(`An error occurred while storing data in the database: ${error}`);
//     throw error;
//   } finally {
//     // Disconnect from the database
//     await client.end();
//   }
// }

// // Define an async main function to run the script
// async function main() {
//   try {
//     // Get user data from the LastPass API
//     const userData = await getLastPassUserData(process.env.LASTPASS_USERNAME);
//     // Log the user data to the console for debugging purposes
//     console.log(userData);
//     // Store the user data in the PostgreSQL database
//     await storeUserDataInDatabase(userData);
//   } catch (error) {
//     logger.error(`An error occurred while running the script: ${error}`);
//   }
// }

// // Run the main function to start the script
// main();

