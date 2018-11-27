FROM nginx

RUN apt-get update
RUN apt-get install -qq curl

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.4.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz"

RUN tar -zxvf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

RUN npm install -g create-react-app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN rm -rf build || true

COPY ./package.json /usr/src/app
RUN npm install

COPY ./tsconfig.json /usr/src/app
COPY ./tsconfig.prod.json /usr/src/app
COPY ./tslint.json /usr/src/app

COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
RUN npm run build:prod

RUN rm -rf /usr/share/nginx/html/* || true
RUN chmod -R 777 ./build/*
RUN cp -r ./build/* /usr/share/nginx/html/

COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
