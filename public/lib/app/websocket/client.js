'use strict';

import io from 'socket.io-client';
import {storage} from './storage';
import {marker} from '../map/markerController';

class Client {
    constructor() {
        this.status = {
            online : false
        };
        this.socket = null;
    }
}

/**
 * Additional socket listeners.
 */
Client.prototype.setupSocketListeners = function setupSocketListeners() {
    client.socket.on('visitors', function(data) {
        console.log('visitors event fired');
        console.log(data);
        if (data.api) {
            if (data.api === 'all') {
                console.log('api: all');
                console.log('data is:');
                //console.log(data);
                marker.populateUsers(data.tracked);
            } else if (data.api === 'refresh') {
                console.log('api: refresh');
                marker.updateUser(data.tracked);
            }
        }
    });
};

/**
 * Authentication with socket.io server.
 * @param {function} cb
 */
Client.prototype.authentication = function authentication(cb) {
    storage.saveUuidAndToken();
    // Create websocket for connecting.
    let websocket = null;
    // Production
    if (window.origin.includes('https://')) {
        websocket = io.connect('https://xn--alize-esa.com', {
            secure: true,
            port: 80,
        });
    } else {
        // Development
        websocket = io.connect('localhost:6660', {
            transports: ['websocket', 'polling'],
        });
    }
    websocket.on('connect', function() {
        websocket.on('client_identity', function(data) {
            console.log('Websocket connecting to server... \n[INFO] Socket id: ' +
                data.socketID + '\n[INFO] Client uuid: ' + storage.socket.config.uuid);
            if (storage.socket.config.uuid && storage.socket.config.token) { // token exists, emit client_identity
                websocket.emit('client_identity', {
                    socketID: data.socketID,
                    uuid: storage.socket.config.uuid,
                    token: storage.socket.config.token,
                });
            } else if (storage.socket.config.uuid) { // no token, emit client_register
                websocket.emit('client_register', storage.socket.config,
                    function(ident) {
                        console.log('[client_register] :\n');
                        storage.socket.config.uuid !== ident.uuid ?
                            console.log(
                                '[INFO] uuid: ' + ident.uuid + '\n[INFO] token: ' + ident.token
                            ) : console.log('[INFO] token: ' + ident.token);
                        storage.socket.config = ident;
                        storage.saveUuidAndToken();
                        websocket.emit('client_identity', {
                            socketID: data.socketID,
                            uuid: storage.socket.config.uuid,
                            token: storage.socket.config.token,
                        });
                    }
                );
            }
        });

        websocket.on('client_ready', function(data) {
            console.log('[client_ready]\n');
            return cb(null, websocket);
        });

        websocket.on('client_error', function(data) {
            console.log('[client_error]\n');
            return cb(new Error('Authentication Error'));
        });
    });
};

/**
 * Initiate client and proceed to authenticate.
 */
export const client = new Client();
client.authentication(function(error, websocket) {
    if (error) throw error;
    client.socket = websocket;
    client.credentials = storage.socket.config;
    client.setupSocketListeners();
});
