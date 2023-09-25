FROM node:18.10.0-alpine3.13

WORKDIR /app/shortie

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4444
CMD ["node", "app.js"]
