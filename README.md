# Hamster Blogging Platform

This is a prototype blogging platform for hamsters. You are able to sign up and posts statuses for all registered users to see. You can also like other people's posts.

This platform is built upon the following technogies:

* Angular 6 Frontend
* NodeJS Backend (written in TypeScript) utilising ExpressJS
* Postgres Database
* Docker

Angular 6 was chosen for the frontend as a simple fast way to get a UI up and running as the emphasis for this platform is the backend. It also makes use of Bootstrap 4 for styling. The frontend will not run without the backend also running at the same time. For this reason, it is best to run everything utilising `docker-compose`.

The preference for doing the backend with NodeJS and TypeScript is to keep things fairly lightweight but done in a domain drive design philosophy. Utilising TypeScript also gives the benefit of strong typing.

The two main domains (users and posts) are separated out along with the actual server implementations (which uses ExpressJS). This keeps things separate and more managable. From there, each domain is broken down into core (containing all business logic), application (which executes the core against the infrastructure) and infrastructure (which contains the database access layer) layers. By breaking it up like this, it allows for unit testing against the core business logic which doesn't require an infrastructure like databases. From there, the application layer can then be tested using integration tests and utilising mock services. Finally the expressJS framework and actual server is setup with middleware and routing which connect up to the business domains. All this makes for a highly robust system which should be quite maintainable and testable.

## Installation

### Requirements

* Docker
* Yarn
* KnexJS

### NodeJS Backend Installation

In the ./backend folder run:

> yarn install

You then need to setup the `.env` and `knexfile.js` configuration files. These files contain the environment variables and settings used in the application and the database.

Copy the sample files (.env.sample and knexfile.sample.js) and rename to the respective files (.env and knexfile.js). They can be used as is or you may modify them if needed.

See ./backend/README.md for more information on the configuration files.

If you need to build the source code (running `yarn install` will also automatically build the source), you can run:

> yarn run build

### Postgres Database

From the ./backend folder, you an initialise the database using knexJS by running (after first setting up the knex.js settings file):

> knex migrate:latest

This is also automatically run each time the NodeJS backend is started.

### Frontend Installation

In the ./frontend folder run:

> yarn install

If you need to build the source code (running `yarn install` will also automatically build the source), you can run:

> yarn run build

For a production build, run:

> yarn run build:prod

## Running the platform

After you have completed the installation process, built the source code, and setup the configuration files, run (from the root directory):

> docker-compose up
