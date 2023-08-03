# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV LASTPASS_CID=your_lastpass_cid
ENV LASTPASS_PROVHASH=your_lastpass_provhash
ENV DATABASE_URL=your_database_url

# Expose the port your application uses (if any)
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "index.cjs" ]
