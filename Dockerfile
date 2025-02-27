FROM node:alpine

RUN mkdir -p /usr/backend

WORKDIR /usr/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start", "dev"]