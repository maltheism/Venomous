'use strict';

/**
 * Module dependencies.
 */
import express from 'express';
import config from './config';

import helmet from 'helmet';
import csp from 'helmet-csp';

const ip = require('ip');

import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';

import * as mongodb from './libraries/db/mongodb';

console.log(ip.address());

const cspWS = ip.address() === config.ip.deployment ?
    config.websocket.deployment :
    config.websocket.development;

console.log(cspWS);

/**
 * Express.js server.
 */
const app = express();

/**
 * Security config.
 */
app.use(helmet());
app.use(csp({
    directives: {
        defaultSrc: [
            `'self'`
        ],
        connectSrc: [
            `'self'`,
            ...cspWS,
            'https://www.google-analytics.com/'
        ],
        scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `'unsafe-eval'`,
            'https://apis.google.com',
            'https://maps.gstatic.com/',
            'https://maps.googleapis.com/',
            'https://www.google-analytics.com/',
            'https://www.googletagmanager.com/',
            `https://www.google.com/recaptcha/`,
            `https://www.gstatic.com/recaptcha/`
        ],
        styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com'
        ],
        fontSrc: [
            `'self'`,
            `data:`,
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com'
        ],
        imgSrc: [
            `'self'`,
            `data: *`,
            'https://maps.google.com',
            'https://maps.gstatic.com/',
            'https://maps.googleapis.com/'
        ],
        frameSrc: [
            `'self'`,
            `https://www.google.com/recaptcha/`
        ],
        upgradeInsecureRequests: false
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const server = require('http').Server(app);

/**
 * Socket.io websockets.
 */
const io = require('socket.io')(server); // add socket.io 'websockets'.
server.listen(config.port.socket); // listen for websockets on port 6660


io.set('heartbeat timeout', 60000);
io.set('heartbeat interval', 25000);

mongodb.streams(io);

/**
 * Socket.io events.
 */
io.on('connection', socket => {
    console.log('[*] Websocket connection found!' + '\n');

    const client = require('./libraries/client/client_middleware');
    client.socketHandler(socket);

    const analytics = require('./libraries/analytics/tracked_middleware');
    analytics.socketHandler(socket);

});

/**
 * Server shutdown.
 */
process.on('SIGINT', () => {
    server.close(() => {
        io.close();
        mongodb.shutdown();
        process.exit(0);
    });
});

export default app;