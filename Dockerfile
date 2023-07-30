FROM node:16.3.0-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

ADD . .

RUN npm run build

RUN npm prune --production

CMD ["node", "./dist/main.js"]