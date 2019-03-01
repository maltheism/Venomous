export default {
    app: {
        name: 'Venomous',
        version: '0.0.1',
        info: 'Web Service'
    },
    ip: {
        server: '35.185.80.170'
    },
    port: {
        server: 5000,
        socket: 6660
    },
    database: {
        mongodb: {
            use: 'deployment', // set to 'deployment' or 'development' to switch (development).
            deployment: 'mongodb://loris:a1123581321@127.0.0.1:27017/lorisgland',
            development: 'mongodb://127.0.0.1:27017/lorisgland'
        }
    },
    websocket: {
        deployment: [
            'ws://35.185.80.170',
            'wss://35.185.80.170',
            'http://35.185.80.170',
            'https://35.185.80.170'
        ],
        development: [
            'ws://localhost:6660',
            'wss://localhost:6660',
            'http://localhost:6660',
            'https://localhost:6660'
        ]
    }
};