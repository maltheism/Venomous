export default {
    app: {
        name: 'Venomous',
        version: '0.0.1',
        info: 'Web Service'
    },
    ip: {
        deployment: '35.185.53.135',
        development: '0.0.0.0'
    },
    port: {
        server: 5000,
        socket: 6660
    },
    database: {
        mongodb: {
            use: 'deployment', // set to 'deployment' or 'development' to switch (development).
            deployment: 'mongodb+srv://alizee:a1123581321@clusteralizee-w1v1h.gcp.mongodb.net/lorisgland?retryWrites=true',
            development: 'mongodb://127.0.0.1:27017/lorisgland'
        }
    },
    websocket: {
        deployment: [
            'ws://xn--alize-esa.com',
            'wss://xn--alize-esa.com',
            'http://xn--alize-esa.com',
            'https://xn--alize-esa.com'
        ],
        development: [
            'ws://localhost:6660',
            'wss://localhost:6660',
            'http://localhost:6660',
            'https://localhost:6660'
        ]
    }
};