FROM node:9.11.2

WORKDIR /app

COPY package.json .
#COPY package-lock.json .

RUN npm install

COPY index.js .
COPY apikeys.js .
COPY projects.js .
COPY server.js .
COPY dist dist

#RUN ng build --prod
ENV NODE_ENV=production

EXPOSE 3000
CMD npm start