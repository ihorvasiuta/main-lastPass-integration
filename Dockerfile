# Use the official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies using npm ci for deterministic builds
RUN npm ci --only=production

# Copy the rest of the application code to the container
COPY . .

# Command to run your application
CMD ["node", "index.cjs"]
