# Use the official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the start script
COPY start.sh /app/start.sh

# Install project dependencies using npm
RUN npm install

# Copy the Prisma schema file to the working directory
COPY schema.prisma ./

# Run prisma to generate the Prisma client 
RUN npx prisma generate

# Copy the rest of the application code to the container
COPY . .

# Command to run your application
CMD ["/app/start.sh"]