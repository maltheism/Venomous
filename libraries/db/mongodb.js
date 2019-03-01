'use strict';

import config from '../../config';

const mongoose = require('mongoose');

import {Schema_Client} from './schema/client';

export function shutdown() {
    mongoose.close();
}

export const Clients = mongoose.model('Client', Schema_Client);

mongoose.Promise = global.Promise;
mongoose.connect(
    (config.database.mongodb.use === 'deployment' ?
            config.database.mongodb.deployment :
            config.database.mongodb.development
    ), { useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB -> connection error!'));

db.once('open', cb => {
    console.log('MongoDB -> open');
    config.database.mongodb.use === 'deployment'
        ? console.log('MongoDB -> URI: ' + config.database.mongodb.deployment)
        : console.log('MongoDB URL -> ' + config.database.mongodb.development);
});

// When the mongodb server goes down, mongoose emits a 'disconnected' event.
mongoose.connection.on('disconnected', () => { console.log('MongoDB -> lost connection'); });
// The driver tries to automatically reconnect by default, so when the
// server starts the driver will reconnect and emit a 'reconnect' event.
mongoose.connection.on('reconnect', () => { console.log('MongoDB -> reconnected'); });

// Mongoose will also emit a 'connected' event along with 'reconnect'.
// These events are interchangeable.
mongoose.connection.on('connected', () => { console.log('MongoDB -> connected'); });
