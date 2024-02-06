FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install

ENTRYPOINT ["pnpm", "run", "dev"]
