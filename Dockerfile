FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV DB_PASSWORD=your_db_password
ENV LASTPASS_CID=your_lastpass_cid
ENV LASTPASS_PROVHASH=your_lastpass_provhash
ENV LASTPASS_USERNAME=your_lastpass_username

CMD [ "node", "index.ts" ]
