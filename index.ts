// index.ts

const request = require('request');
const winston = require('winston');
const { Client } = require('pg');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Update these values to match your database setup
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "0000", 
  database: "mainlastpassintegration"
});

async function getLastPassUserData(username) {
  const options = {
    method: 'POST',
    url: 'https://lastpass.com/enterpriseapi.php',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "cid": 26272911,
      "provhash": "3d04fc60d502489779c5bad0329e0a996255850ee9c2e42e85eeb2b7d5ec47eb",
      "cmd": "getuserdata",
      "data": {
        "username": username
      }
    })
  };

  try {
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

async function storeUserDataInDatabase(userData) {
  try {
    await client.connect();
    const query = `INSERT INTO secondtable (username, last_login, sites, last_pw_change) VALUES ($1, $2, $3, $4)`;
    const userId = Object.keys(userData.Users)[0];
    const user = userData.Users[userId];
    const values = [user.username, user.last_login, user.sites, user.last_pw_change];
    await client.query(query, values);
    logger.info(`Successfully stored data in database`);
  } catch (error) {
    logger.error(`An error occurred while storing data in the database: ${error}`);
    throw error;
  } finally {
    await client.end();
  }
}


async function main() {
  try {
    const userData = await getLastPassUserData("testing.akk32@gmail.com");
    console.log(userData);
    await storeUserDataInDatabase(userData);
  } catch (error) {
    logger.error(`An error occurred while running the script: ${error}`);
  }
}

main();
