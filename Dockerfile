FROM node:20-alpine

RUN apk add --no-cache make git

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install node modules
COPY package*.json /app/
RUN cd /app

# Install application
COPY . /app
RUN chmod +x ./start.sh

# Mount persistent storage
VOLUME /app/public

RUN if [ ! -d "node_modules" ]; then npm ci; fi
CMD ./start.sh
