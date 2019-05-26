'use strict';

import {map} from './mapController';
import Swal from 'sweetalert2';

class Marker {
    constructor() {
        this.users = {
            markers: new Map(), // all google markers for users.
            details: new Map(), // all the users details.
        }
    }
}

Marker.prototype.onlineTotal = function onlineTotal() {
    console.log('onlineTotal fired!');
    let count = 0;
    for (let user of marker.users.details) {
        console.log(user);
        if (user[1].online) {
            count+=1;
        }
    }
    document.getElementById('visitors').innerHTML = 'Visitors: ' + count;
};

Marker.prototype.updateUser = function updateUser(user) {
    console.log(user);
    // Exists already in hashmap.
    if (marker.users.details.has(user.uuid)) {
        marker.users.details.set(user.uuid, user);
        if (user.online) {
            // user online (add to map).
            const oldMarker = marker.users.markers.get(user.uuid);
            map.oms.addMarker(oldMarker.marker);

        } else {
            // user offline (remove from map).
            console.log('setting offline');
            console.log(marker.users);
            const oldMarker = marker.users.markers.get(user.uuid);
            console.log(oldMarker);
            oldMarker.marker.setMap(null);
        }

    } else {
        // New user to hashmap.
        let animation = true;
        const content = "<div>" +
                            "<div class='pin' style='background: #e57373'>" +
                                "<div class='pin_avatar'>" +
                                "</div>" +
                            "</div>" +
                            "<div class='pulse'></div>" +
                        "</div>";
        if (marker.users.details.has(user.uuid)) {
            // Marker already exists
            const temp = marker.users.markers.get(user.uuid);
            temp.marker.setPosition(
                new google.maps.LatLng(
                    user[i].loc.coordinates[1],
                    user[i].loc.coordinates[0]
                )
            );
        } else {
            // New Marker
            marker.users.details.set(user.uuid, user);

            const newMarker = new google.maps.Marker({
                map: map.self,
                position: {
                    lat: user.loc.coordinates[1],
                    lng: user.loc.coordinates[0]
                },
                animation: animation ? google.maps.Animation.DROP : '',
                cursor: 'pointer',
                draggable: false,
                content: content,
                zIndex: -26
            });

            google.maps.event.addListener(newMarker, 'spider_click', function () {
                console.log(user.uuid);
                console.log(user);

                Swal.fire({
                    title: 'User Details',
                    text: JSON.stringify(user),
                    type: 'info',
                    confirmButtonText: 'Okay!'
                });
            });

            marker.users.markers.set(user.uuid, {
                uuid: user.uuid,
                marker: newMarker
            });
            console.log('CHECK:');
            console.log(marker.users.markers);

            const refresh = setInterval(function () {
                if (OverlappingMarkerSpiderfier && map.oms) {
                    // Adds the marker to the spiderfier _and_ the map
                    console.log('add marker');
                    map.oms.addMarker(newMarker);
                    clearInterval(refresh);
                }
            }, 500);
        }

    }
    marker.onlineTotal();
};

Marker.prototype.populateUsers = function populateUsers(users) {
    console.log(users);
    const users_length = users.length;
    for (let i=0; i<users_length; i++) {
        let animation = true;
        const content = "<div>" +
                             "<div class='pin' style='background: #e57373'>" +
                                "<div class='pin_avatar'>" +
                                "</div>" +
                            "</div>" +
                            "<div class='pulse'></div>" +
                        "</div>";
        if (marker.users.details.has(users[i].uuid)) {
            const temp = marker.users.markers.get(users[i].uuid);
            temp.marker.setMap(null);
            animation = false;
        }
        marker.users.details.set(users[i].uuid, users[i]);

        const newMarker = new google.maps.Marker({
            map: map.self,
            position: {
                lat: users[i].loc.coordinates[1],
                lng: users[i].loc.coordinates[0]
            },
            animation: animation ? google.maps.Animation.DROP : '',
            cursor: 'pointer',
            draggable: false,
            content: content,
            zIndex: -26
        });

        google.maps.event.addListener(newMarker, 'spider_click', function() {
            console.log('Clicked uuid:');
            console.log(users[i].uuid);
            console.log('details:');
            console.log(users[i]);

            Swal.fire({
                title: 'User Details',
                text: JSON.stringify(users[i]),
                type: 'info',
                confirmButtonText: 'Okay!'
            });
        });

        marker.users.markers.set(users[i].uuid, {
            uuid: users[i].uuid,
            marker: newMarker
        });
        console.log('CHECK:');
        console.log(marker.users.markers);

        const refresh = setInterval(function() {
            if (OverlappingMarkerSpiderfier && map.oms) {
                // Adds the marker to the spiderfier _and_ the map
                console.log('add marker');
                map.oms.addMarker(newMarker);
                clearInterval(refresh);
            }
        }, 500);
    }
    marker.onlineTotal();
};

export const marker = new Marker();