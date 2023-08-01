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