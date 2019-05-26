FROM node:latest

ARG port

COPY .env .env

WORKDIR /usr/src
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./frontend/package*.json ./frontend/

RUN npm --prefix frontend install --production

# Bundle app source
COPY ./frontend ./frontend
COPY ./shared ./shared

EXPOSE $port

WORKDIR /usr/src/frontend
