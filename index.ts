// index.ts

// const request = require('request');

// const options = {
//   method: 'POST',
//   url: 'https://lastpass.com/enterpriseapi.php',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "cid": 26272911,
//     "provhash": "3d04fc60d502489779c5bad0329e0a996255850ee9c2e42e85eeb2b7d5ec47eb",
//     "cmd": "getuserdata",
//     "data": {
//         "username": "testing.akk32@gmail.com"
//     }
//   })
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });


// const request = require('request');

// async function getLastPassUserData(username) {
//   const options = {
//     method: 'POST',
//     url: 'https://lastpass.com/enterpriseapi.php',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "cid": 26272911,
//       "provhash": "3d04fc60d502489779c5bad0329e0a996255850ee9c2e42e85eeb2b7d5ec47eb",
//       "cmd": "getuserdata",
//       "data": {
//         "username": username
//       }
//     })
//   };

//   try {
//     const response = await new Promise((resolve, reject) => {
//       request(options, function (error, response, body) {
//         if (error) {
//           console.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);
//           reject(error);
//         }
//         resolve(JSON.parse(body));
//       });
//     });
//     console.log(`Successfully retrieved data for user ${username}`);
//     return response;
//   } catch (error) {
//     console.error(`An error occurred while retrieving data from the LastPass API for user ${username}: ${error}`);
//     throw error;
//   }
// }

// async function main() {
//   try {
//     const userData = await getLastPassUserData("testing.akk32@gmail.com");
//     console.log(userData);
//   } catch (error) {
//     console.error(`An error occurred while running the script: ${error}`);
//   }
// }

// main();





const request = require('request');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
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

async function main() {
  try {
    const userData = await getLastPassUserData("testing.akk32@gmail.com");
    console.log(userData);
  } catch (error) {
    logger.error(`An error occurred while running the script: ${error}`);
  }
}

main();
