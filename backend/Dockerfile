FROM node:18.12.1

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Define build arguments with default values
ARG JWT_SECRET=jwt_secret
ARG MONGODB_URL=another_default_value

# Use the build arguments as environment variables
ENV JWT_SECRET=$JWT_SECRET
ENV MONGODB_URL=$MONGODB_URL

# Copy the rest of the application code to the container
COPY . .

# Expose a port (if your app listens on a specific port)
EXPOSE 4000


# Define the command to run your application
CMD ["npm", "start"]