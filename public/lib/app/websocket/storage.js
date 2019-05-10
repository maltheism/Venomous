'use strict';

export const Cookies = require('js-cookie');

/**
 * Storage for client.js
 */
class Storage {
    /**
     * constructor initialize:
     * ( config: {uuid, token} ).
     */
    constructor() {
        this.socket = {
            config: {
                uuid: Cookies.get('open-science-uuid')
                    ? Cookies.get('open-science-uuid') : '',
                token: Cookies.get('open-science-token')
                    ? Cookies.get('open-science-token') : '',
            },
        };
    }
}

export const storage = new Storage();

/**
 * Save Uuid and Token to storage.
 */
Storage.prototype.saveUuidAndToken = function saveUuidAndToken() {
    Cookies.set('open-science-uuid', storage.socket.config.uuid, {
        secure: window.origin.includes('https://'),
        expires: 7,
    }); // expires in 7 days
    Cookies.set('open-science-token', storage.socket.config.token, {
        secure: window.origin.includes('https://'),
        expires: 7,
    }); // expires in 7 days
};
