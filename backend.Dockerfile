FROM node:latest

WORKDIR /usr/src

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY backend/package*.json ./backend/

RUN npm --prefix ./backend install

# Bundle app source
COPY ./backend ./backend
COPY ./shared ./shared

EXPOSE 8080

WORKDIR /usr/src/backend

CMD [ "npm", "run", "start:prod" ]
