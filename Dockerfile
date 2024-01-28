# Install and Build the Code.
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Development image
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

CMD ["npm", "run", "start:dev"]
