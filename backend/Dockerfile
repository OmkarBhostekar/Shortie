FROM node

WORKDIR /app/shortie

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8888
CMD ["npm", "start"]
