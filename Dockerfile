FROM node:14-alpine3.10 as build

WORKDIR /app/
COPY ./package.json /app/

# Adding git to the image to resolve this issue for mysql2 and TypeScript - https://github.com/types/mysql2/issues/30
RUN apk add --no-cache git && \
    npm install && \
    npm install -g ts-node
COPY . /app/
RUN npm run build:prod

FROM node:14-alpine3.10
ENV DOCKER_CONTAINER=true

COPY --from=build /app/ /app/
RUN npm install -g pm2
EXPOSE 4000
CMD [ "pm2", "start", "/app/dist/AngularUniversalSSR/server/main.js", "--no-daemon", "-i", "0" ]
