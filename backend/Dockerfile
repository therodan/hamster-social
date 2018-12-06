FROM node:10

RUN apt-get update && apt-get install git -y
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /server

# Bundle APP files
COPY . /server

# Install app dependencies
RUN yarn install

# Expose the listening port of app
EXPOSE 8000

USER node

CMD [ "npm", "start" ]
