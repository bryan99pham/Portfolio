FROM node:16-alpine

ENV NODE_ENV=development

COPY . /rawgs-app

WORKDIR /rawgs-app

RUN npm i -g pnpm

RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 5173

CMD ["pnpm", "run", "dev"]
