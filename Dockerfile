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
VOLUME /app/data
VOLUME /app/public

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD \[ -d "node_modules" \] && /wait && ./start.sh || npm ci && /wait && ./start.sh
