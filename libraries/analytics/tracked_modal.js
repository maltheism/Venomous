'use strict';

import iplocation from 'iplocation';
import {Tracked} from '../db/mongodb';

/**
 * @name registerTracked
 * @description Register Tracked by user object supplied.
 * @param data
 * @param cb
 */
export function registerTracked(data, cb) {
    console.log('registerTracked called:');
    Tracked.findOne({ uuid: data.uuid }, (err, tracked) => {
        if (tracked) {
            // Already exists.
            // todo update location history.
            console.log('already exist')
        }
        else {
            // (New) Tracked never created.
            tracked = new Tracked({
                uuid: data.uuid,
                info: data,
                online: false,
                loc: {
                    type: 'Point',
                    coordinates: [
                        data.location.longitude,
                        data.location.latitude
                    ] // longitude, latitude
                },
                timestamp: new Date().getTime(),
            });
        }
        // Save and Update DB.
        tracked.save((err, tracked) => {
            if (err) { // tracked not registered.
                console.log(err);
                return cb({
                    errors: [{
                        message: 'Could not register',
                        code: 500
                    }]
                });
            } else { // client registered.
                return cb(tracked);
            }
        });
    });
}

export function getLocation(data, cb) {

    console.log('getLocation called for IP:');
    console.log(data.ipAddress);

    // Debug Mode.
    if (data.ipAddress === '142.157.115.13') {
        data.location = {
            country: 'CA',
            countryCode: 'CA',
            region: 'Quebec',
            regionCode: '',
            city: 'Montréal',
            postal: 'H3A',
            ip: '142.157.115.13',
            latitude: 45.504,
            longitude: -73.5747,
            timezone: '',
        };
        return cb(null, data);
    } else {
        // Get Location from IP Address.
        iplocation(data.ipAddress, [], (error, res) => {
            if (res) {
                data.location = res;
                return cb(null, data);
            } else if (error) {
                console.log(error);
                data.location = 'unknown';
                return cb('error', data);
            }
        });
    }
}

export function getTrackedOnline(cb) {
    Tracked.find({online: true},
        '-__v',
        function(err, tracked) {
            if (err) {
                return cb(null);
            }
            else {
                console.log('success getTrackedOnline');
                console.log(tracked);
                return cb(null, tracked);
            }
        }
    );
}