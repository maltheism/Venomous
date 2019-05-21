'use strict';

import {client} from '../websocket/client';
import {mapStyles} from './mapStyle';

class GoogleMap {
    /**
     * constructor initialize: (status, credentials, socket).
     */
    constructor() {
        this.self = null;
        this.options = {
            timeout: 5000,
            maximumAge: 0,
            enableHighAccuracy: true
        };
        this.geocoder = null;
        this.autocomplete = null;
        this.oms = null;
        this.loaded = false;

        this.custom = {
            marker: null
        }
    }
};

/*
 * @name initMap
 * @description initMap() called after maps.googleapis.com
 * finishes sending our API-key.
 */
function initMap() {

    // Print latest Google Maps API.
    console.log('Google Maps API version: ' + google.maps.version);

    // Begin initializing map.
    map.setupMap();

    // Request latest map markers
    const refresh = setInterval(function() {
        if (map && map.loaded && client && client.socket) {
            client.socket.emit('get_visitors');
            clearInterval(refresh);
        }
    }, 500);
}

// Setup Map from null/empty state.
GoogleMap.prototype.setupMap = function setupMap() {

    // Usage: convert address to coordinates.
    map.geocoder = new google.maps.Geocoder;

    // assign google map to map.self with configurations.
    map.self = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.50539899904600,
            lng: -73.57699655689082
        },
        zoom: 16,
        mapTypeControl: false,
        clickableIcons: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy'
    });

    // OverlappingMarkerSpiderfier
    const refresh = setInterval(function() {
        if (OverlappingMarkerSpiderfier) {
            console.log('YAY');
            map.oms = new OverlappingMarkerSpiderfier(map.self, {
                markersWontMove: false, // Promise not to move any markers, allowing optimizations
                markersWontHide: true, // Promise not to change visibility of any markers, allowing optimizations
                basicFormatEvents: true, // Allow the library to skip calculating advanced formatting information
                circleFootSeparation: 40,
                nearbyDistance: 35,
                ignoreMapClick: true
            });
            map.loaded = true;
            console.log(map.oms);
            clearInterval(refresh);
        }
    }, 500);

    // Style the map
    map.self.setOptions({styles: mapStyles['light']})
};

window.initMap = initMap;

export let map = new GoogleMap();