# Hamster Social

## Requirements

* Docker
* Yarn

## Installation

### Backend Installation

In the ./backend folder run:

> yarn install

You then need to setup the `.env` and `knexfile.js` configuration files. These files contain the environment variables and settings used in the application and the database.

Copy the sample files (.env.sample and knexfile.sample.js) and rename to the respective files (.env and knexfile.js). They can be used as is or you may modify them if needed.

See README.md in backend for more information on the configuration files.

### Frontend Installation

In the ./frontend folder run:

> yarn install

## Running

After you have completed the installation process, run (from the root directory):

> docker-compose up
