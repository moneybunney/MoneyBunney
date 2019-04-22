FROM node:latest

WORKDIR /usr/src
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./frontend/package*.json ./frontend/

RUN npm --prefix frontend install

# Bundle app source
COPY ./frontend ./frontend
COPY ./shared ./shared

EXPOSE 3000

WORKDIR /usr/src/frontend

ENTRYPOINT [ "npm", "run", "start:prod" ]
