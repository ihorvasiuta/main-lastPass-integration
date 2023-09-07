const axios = require('axios');

class LastPassAPI {
  constructor() {
    this.cid = process.env.LASTPASS_CID;
    this.provhash = process.env.LASTPASS_PROVHASH;
    this.baseURL = 'https://lastpass.com/enterpriseapi.php';
  }

  async getEvents(from, to) {
    const response = await axios.post(this.baseURL, {
      cid: this.cid,
      provhash: this.provhash,
      cmd: 'reporting',
      data: {
        from,
        to
      }
    });

    if (response.status !== 200) {
      throw new Error(`Failed to retrieve event data: ${response.statusText}`);
    }

    if (response.data.status !== 'OK') {
      throw new Error(`Failed to retrieve event data: ${response.data}`);
    }

    return response.data.data;
  }

  async getUsers() {
    const response = await axios.post(this.baseURL, {
      cid: this.cid,
      provhash: this.provhash,
      cmd: 'getuserdata',
      data: {}
    });

    return response.data.Users;
  }
}

module.exports = LastPassAPI;
