
FROM node:latest

RUN mkdir -p /usr/src/moshbot
WORKDIR /usr/src/moshbot

COPY . /usr/src/moshbot
RUN npm install

# Run the bot!
CMD ["node", "index.js"]