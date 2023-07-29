
//HERE I TEST CODES FOR NOW 


const request = require('request');

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
        "username": "testing.akk32@gmail.com"
    }
  })
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
