FROM node:18.12.1

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if your app listens on a specific port)
EXPOSE 4000

# Define the command to run your application
CMD ["npm", "start"]