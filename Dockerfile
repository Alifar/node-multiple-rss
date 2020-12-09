# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install async
RUN npm install forever -g
RUN npm ci --only=production

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

# start app
CMD ["forever", "index.js"]