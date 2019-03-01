'use strict';

const mongoose = require('mongoose');

const Schema_Client = mongoose.Schema({
    socketID: String,
    uuid: String,
    token: String,

    channel: String,
    online: {
        type: Boolean,
        default: false
    },

    timestamp: Date
});

export {Schema_Client};