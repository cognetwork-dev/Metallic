FROM node:latest

WORKDIR /app

COPY . /app/

COPY package*.json /app/

RUN npm install -g pnpm

RUN pnpm config set ignore-scripts false

RUN pnpm rebuild

RUN pnpm install

RUN mkdir -p /app/node_modules/.pnpm/@rubynetwork+rh@1.2.71_bufferutil@4.0.8/node_modules/@rubynetwork/rh/cache-js

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "start"]
