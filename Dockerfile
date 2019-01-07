FROM node:9

WORKDIR /app

COPY package.json .
#COPY package-lock.json .

RUN npm install

COPY index.js .
COPY server.js .
COPY apikeys.js .
COPY projects.js .
COPY dist dist

#RUN ng build --prod
ENV NODE_ENV=production

EXPOSE 3000
CMD npm start