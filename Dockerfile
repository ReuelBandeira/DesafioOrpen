# Install and Build the Code.
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

# Development image
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY . .

COPY --from=builder /usr/src/app/node_modules ./node_modules

# Production image
FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]