FROM node:12.16.1

#Create API directory
WORKDIR /usr/src/API

# Install app dependencies
COPY package*.json ./
RUN npm install

#building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000


CMD [ "npm", "start" ]
