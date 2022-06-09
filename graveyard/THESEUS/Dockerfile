FROM node:12-alpine
WORKDIR /server
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["node", "./code/server.js"]

