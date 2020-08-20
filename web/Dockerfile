FROM node:alpine

WORKDIR /app

COPY web/package.json /app
COPY web/package-lock.json ./app

RUN npm install

CMD ["npm", "start"]
