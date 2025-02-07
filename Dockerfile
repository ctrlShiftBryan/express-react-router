FROM node:20-alpine AS development-dependencies-env
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY . /app
WORKDIR /app
RUN yarn install

FROM node:20-alpine AS production-dependencies-env
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY ./package.json yarn.lock /app/
WORKDIR /app
RUN yarn install --production

FROM node:20-alpine AS build-env
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn build

FROM node:20-alpine
RUN corepack enable && corepack prepare yarn@1.22.22 --activate
COPY ./package.json yarn.lock server.js /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["yarn", "start"]
