FROM node:lts-alpine
WORKDIR /usr/app
ENV NODE_ENV=production
ENV PORT=80
COPY ./package* .
RUN npm i pm2 -g && npm i 
COPY . .
EXPOSE 80