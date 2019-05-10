'use strict';

const mongoose = require('mongoose');

const Schema_Tracked = mongoose.Schema({

    // UUID from client (websocket).
    uuid: String,

    online: Boolean,

    // Device Info from browser.
    info: Object,

    // Date created.
    date: {
        type: Date,
        default: Date.now
    },

    // Location of User.
    loc: {
        type: { type: String },
        coordinates: []
    },
});

Schema_Tracked.index({ loc: '2dsphere' });

export {Schema_Tracked};