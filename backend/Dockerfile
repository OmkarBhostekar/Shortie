FROM alpine:3.17

ENV NODE_VERSION 18.18.0

WORKDIR /app/shortie

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4444
CMD ["node", "app.js"]
