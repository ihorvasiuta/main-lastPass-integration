const logger = require('./logger.cjs');
const LastPassDataProcessor = require('./lastPassDataProcessor.cjs');

async function main() {
  try {
    const lastPassDataProcessor = new LastPassDataProcessor();

    // Get event data from the LastPass API and store it in the database
    await lastPassDataProcessor.getAndStoreLastPassEvents('2023-09-01 00:00:00', '2023-09-31 23:59:59');
    
    // Get user data from the LastPass API and store it in the database
    await lastPassDataProcessor.getAndStoreLastPassUsers();
  } catch (error) {
    logger.error(`An error occurred while running the script: ${error}`);
  }
}

main();

