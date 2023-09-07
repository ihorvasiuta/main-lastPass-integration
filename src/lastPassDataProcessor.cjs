const LastPassAPI = require('./lastPassAPI.cjs');
const prisma = require('./prismaClient.cjs');
const logger = require('./logger.cjs');

class LastPassDataProcessor {
  constructor() {
    this.lastPassAPI = new LastPassAPI();
  }

  async getAndStoreLastPassEvents(from, to) {
    try {
      const eventsData = await this.lastPassAPI.getEvents(from, to);

      for (const key in eventsData) {
        const eventData = eventsData[key];

        // Validate the data before storing it in the database
        if (!eventData.Time || !eventData.Username || !eventData.IP_Address || !eventData.Action || !eventData.Data) {
          logger.warn(`Invalid event data: ${JSON.stringify(eventData)}`);
          continue;
        }

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

  async getAndStoreLastPassUsers() {
    try {
      const usersData = await this.lastPassAPI.getUsers();

      for (const key in usersData) {
        const userData = usersData[key];
        await prisma.user.create({
          data: {
            username: userData.username,
            fullname: userData.fullname,
            admin: userData.admin,
            last_login: userData.last_login ? new Date(userData.last_login) : null,
            last_pw_change: new Date(userData.last_pw_change),
            sites: userData.sites,
            disabled: userData.disabled,
            created_at: new Date()
          }
        });
      }

      logger.info(`Successfully stored user data in database`);
    } catch (error) {
      logger.error(`An error occurred while retrieving and storing user data: ${error}`);
    }
  }
}

module.exports = LastPassDataProcessor;
