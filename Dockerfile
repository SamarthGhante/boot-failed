# ---- Base Node ----
FROM node:14 AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies  
RUN npm install

# ---- Copy Files ----
FROM dependencies AS release  
WORKDIR /usr/src/app
COPY . /usr/src/app

# Install PM2 globally
RUN npm install -g pm2

EXPOSE 3000
CMD ["pm2-runtime", "start", "server.js"]
