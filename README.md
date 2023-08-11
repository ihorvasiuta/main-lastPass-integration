# LastPass Integration for User and Activity Data

This project provides an integration for retrieving and analyzing user and activity data from the LastPass service.

## Overview

The integration focuses on fetching user and activity data from LastPass and storing it in a PostgreSQL database. It collects information about users and their activity, such as login events and password changes.

## Setup

1. Clone this repository:

You can clone this project using command:

    git clone https://github.com/ihorvasiuta/main-lastPass-integration
    cd main-lastPass-integration

2. Create a .env file:

Create a .env file in the root directory with the following variables:
```
    # PostgreSQL Environment Variables
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD="0000"
    POSTGRES_DB=mainlastpassintegration
    DB_HOST=prisma-postgres
    DB_PORT=5432

    # Application Environment Variables
    LASTPASS_CID=your_lastpass_cid
    LASTPASS_PROVHASH=your_lastpass_provhash
    DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
```

Replace `your_lastpass_cid` and `your_lastpass_provhash` with your LastPass CID and Provhash.

4. Running with Docker:

You can run this project using Docker and Docker Compose. Ensure you have Docker installed.

Build and start the containers:

    docker-compose up --build

5.  Accessing Data in PostgreSQL:

After the integration runs and data is stored in the PostgreSQL database, you can access and analyze it using SQL queries:

Connect to your PostgreSQL server using your preferred SQL client connect to port 3000.
Connect to the database you specified in the .env file.
Write SQL queries to retrieve and analyze the stored data. For example:

    SELECT * FROM "Event";
    SELECT * FROM "User";

6. Viewing Data in pgAdmin 4:

For a graphical view of the data stored in PostgreSQL, you can use pgAdmin 4:

Open pgAdmin 4.
Connect to your PostgreSQL server on 3000.
Connect to your database.
In the "Object" browser, expand the database, schema, and tables.
Right-click on a table (e.g., "Event" or "User") and select "View/Edit Data" > "All Rows". This will open a new tab showing the data stored in the table.

7. Running Locally:

If you prefer to run the project locally you can follow [the docker build instrucitons](./Dockerfile) how to do it.

8. Additional Information:

    This project uses Docker and Docker Compose for easy setup.
    The docker-compose.yml file defines the services and configurations.
    The Dockerfile sets up the Node.js environment for the project.
    The integration fetches LastPass user and activity data and stores it in a PostgreSQL database.
    Logging is implemented using Winston.