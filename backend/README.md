# Hamster Social Backend

## Configuration

### .env

This file contains the environment variables that make up the settings for the application (/src/server/settings.ts). The environment variables are automatically pulled into the settings file.

#### Settings

`PORT` - The connection port the application will run on (default 8000)

`HTTPS` - Whether the application will run on HTTPS

`SECRET` - A secret string used for securing sessions

`POSTGRES_CON` - The PostgreSQL database connection string

#### knexfile.js

This file is used by knex.js to setup the database. The sample file contains two settings:

* Development - This is the default (and is automatically run when using npm start). The default is setup to run on the postgres host setup in Docker.

* Local - Used when you want to run knex commands locally

##### Using Knex

##### Migrate to latest version of database

> knex migrate:latest

OR to run against localhost

> knex migrate:latest --env local
