// index.ts
require('dotenv').config();
import request from 'request';

const accessToken = process.env.LASTPASS_ACCESS_TOKEN;

async function getLastPassUserData(username: string) {
  const options = {
    method: 'POST',
    url: 'https://lastpass.com/enterpriseapi.php',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      "cid": 26272911,
      "provhash": "3d04fc60d502489779c5bad0329e0a996255850ee9c2e42e85eeb2b7d5ec47eb",
      "cmd": "getuserdata",
      "data": {
        "username": "testing.akk32@gmail.com"
      }
    })
  };

  try {
    const response = await new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) reject(error);
        resolve(body);
      });
    });
    console.log(response);
  } catch (error) {
    console.error(`An error occurred while retrieving data from the LastPass API: ${error}`);
  }
}

getLastPassUserData("testing.akk32@gmail.com");
