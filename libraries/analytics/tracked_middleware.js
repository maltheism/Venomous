'use strict';

import * as Tracked from './tracked_modal';
import * as Client from '../client/client_model';

/**
 * Websocket event handlers.
 */
export function socketHandler(socket) {
    /**
     * Received tracking message.
     */
    socket.on('track_me', function(data) {

        console.log('track_me fired.');

        // Remote IP Address.
        let ipAddress = socket.request.connection.remoteAddress ?
            socket.request.connection.remoteAddress :
            socket.conn.transport.socket._socket.remoteAddress;
        ipAddress = '127.0.0.1' ? '142.157.115.13' : ipAddress;

        // Save to data.
        data.ipAddress = ipAddress;

        // Get location info.
        Tracked.getLocation(data, function(error, data) {
            if (error) {

            }
            // Console.log(data)
            console.log(data);
            // todo Store in db.
            Client.getUUID(socket, function(uuid) {
                console.log(uuid);
                data.uuid = uuid;
                Tracked.registerTracked(data, function(error, tracked) {
                    if (error) {
                        console.log('error happened');
                        console.log(error);
                    } else {
                        console.log(tracked);
                    }
                });
            });
        });
    });

    socket.on('get_visitors', function() {
        console.log('get_visitors fired!');
        Tracked.getTrackedOnline(function (err, tracked) {
            if (err) {
                console.log('get_visitors had an error');
            } else {
                console.log('get_visitors success');
                console.log(tracked);
                socket.emit('visitors', {
                    api: 'all',
                    tracked: tracked
                });
            }
        });
    });
}
