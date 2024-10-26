FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps --verbose

COPY . .

CMD ["npm", "start"]