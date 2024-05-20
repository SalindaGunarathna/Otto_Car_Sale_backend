# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install 

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on.
EXPOSE 3001

# Set environment variables
ARG MONGO_URI
ARG PORT
ARG PASSWORD
ARG EMAIL
ARG PERSONAL_EMAIL
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG REDIRECT_URL
ARG REFRESH_TOKEN
ARG SECRET_KEY

# Start the application.
CMD [ "npm", "start" ]
