FROM node

WORKDIR /app/shortie

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4444
CMD ["npm", "start"]
