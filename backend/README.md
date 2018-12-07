# Hamster Blogging Platform Backend

This is a restful API for utilisation with the Hamster Blogging Platform frontend. It is built using NodeJS and TypeScript and connects to a Postgres database.

It provides key functionality to allow for registration and login (including session management), and posting and liking.

## Configuration

### .env

This file contains the environment variables that make up the settings for the application (/src/server/settings.ts). The environment variables are automatically pulled into the settings file. You need to set up this file before running the application (or copy the `.env.sample` file and rename it to `.env`).

#### Settings

`PORT` - The connection port the application will run on (default 8000)

`HTTPS` - Whether the application will run on HTTPS

`SECRET` - A secret string used for securing sessions

`POSTGRES_CON` - The PostgreSQL database connection string

#### knexfile.js

This file is used by knex.js to setup the database. The sample file (`knex.sample.js`) contains two settings:

* Development - This is the default (and is automatically run when using npm start). The default is setup to run on the postgres host setup in Docker.

* Local - Used when you want to run knex commands locally

Copy the `knex.sample.js` file and rename it to `knex.js`.

##### Using Knex

##### Migrate to latest version of database

> knex migrate:latest

OR to run against localhost

> knex migrate:latest --env local

## Testing

There are included unit and integration testing with this application. The tests themselves are included in the specs folders and utilise mocha and chai as a testing framework. They can be run by typing:

> yarn test

or

> npm test

### Code structure

The system is designed using domain driven design philosophies with two separate domains:

* Users

* Posts

Each domain is broken up into separate core, application and infrastructure layers. The users domain also utilises the Commands and Queries design pattern (although there are no queries in this implementation).
