FROM node:latest

WORKDIR /usr/src
RUN mkdir -p shared app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./app/
COPY ../shared ./shared/

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
