FROM oven/bun:latest

WORKDIR /app

COPY . /app/

COPY package.json /app/

COPY bun.lockb /app/

RUN bun install

RUN bun run build

EXPOSE 8080

CMD ["bun", "run", "start"]
