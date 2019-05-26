'use strict';

import config from '../../config';

const mongoose = require('mongoose');

import {Schema_Client} from './schema/client';
import {Schema_Tracked} from './schema/tracked';

export function shutdown() {
    mongoose.disconnect().then(() => {
        console.log('Mongoose connection is disconnected due to application termination');
    });
}

export const Clients = mongoose.model('Client', Schema_Client);
export const Tracked = mongoose.model('Tracked', Schema_Tracked);

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

export function streams(io) {
    // Mongoose streams 'change' for Client.
    Clients.watch().on('change', data => {
        console.log(new Date(), data);
        Clients.findById(data.documentKey,
            '-_id -__v',
            function (err, dbObj) {
                if (err) {
                    console.log('error');
                } else {
                    // Online status from Client.
                    console.log('Client change occurred!');
                    console.log(dbObj);
                    if (dbObj && dbObj.uuid) {
                        const online = dbObj.online;
                        const uuid = dbObj.uuid;
                        console.log('online is ' + online);
                        console.log('uuid is ' + uuid);
                        Tracked.findOne({
                            uuid: uuid,
                        }, (err, tracked) => {
                            if (err) {
                                console.log('Not found..');
                            } else if (tracked) {
                                console.log('tracked exists');
                                // Set Online status for Tracked.
                                tracked.online = online;
                                tracked.save((err, tracked) => {
                                    if (err) { // tracked not registered.
                                        console.log(err);
                                    } else { // client registered.
                                        console.log('success setting online status');
                                        io.sockets.emit('visitors', {
                                            api: 'refresh',
                                            tracked: tracked
                                        });
                                    }
                                });
                            } else {
                                console.log('debug this');
                            }
                        });
                    }
                    // todo update Tracked
                }
            }
        );
    });
}