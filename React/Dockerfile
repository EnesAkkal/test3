# Use the official Node.js 17 image as the base image
FROM node:18.11-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the entire local directory to the working directory inside the container
COPY . .

# Install dependencies from package.json
RUN npm install

# Expose the port that the app runs on
EXPOSE 3000

CMD [ "npm", "start" ]
