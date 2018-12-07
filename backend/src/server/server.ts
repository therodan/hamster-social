import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as morgan from 'morgan';

import serverSettings from './settings';
import { wildcardRouter, errorHandler, sessionRouter, usersRouter } from './routes';

const app: Express = express();

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: serverSettings.secret,
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: serverSettings.https
    },
    name: 'bid'
}));
app.use(morgan('combined'));

/**
 * Routing
 */
app.use(sessionRouter);

app.use(usersRouter);

// Handle all other routes
app.use(wildcardRouter);

// Handle all errors
app.use(errorHandler);

export function start() {
    /**
     * Start Server
     */
    const server = app.listen(serverSettings.port);

    server.on('error', function (error: NodeJS.ErrnoException) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = (typeof serverSettings.port === 'string') ? 'Pipe ' + serverSettings.port : 'Port ' + serverSettings.port;

        switch (error.code) {
            case 'EACCES':
                throw new Error(`${bind} requires elevated privileges`);
            case 'EADDRINUSE':
                throw new Error(`${bind} is already in use`);
            default:
                throw error;
        }
    });

    server.on('listening', function () {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

        console.log(`Server Listening on ${bind}`);
    });
}
