FROM node:20.14-slim

WORKDIR /home/node/app

RUN chown -R node:node /home/node/app

USER node

EXPOSE 3000

CMD ["tail","-f","/dev/null"]
