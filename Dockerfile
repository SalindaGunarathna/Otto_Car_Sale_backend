
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app


COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

RUN mkdir -p /usr/src/app/public/file && chmod -R 755 /usr/src/app/public

# Expose the port the app runs on
EXPOSE 3001

# Define the environment variables

ENV MONGO_URI=""
ENV PORT=3001
ENV PASSWORD=""
ENV EMAIL=""
ENV SECRET_KEY=""
ENV OWNER_EMAIL=""

# Command to run the application
CMD [ "npm", "start" ]
