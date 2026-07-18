FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "server.js"]
