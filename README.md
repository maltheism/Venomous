# Venomous

#### Description: 

Open Science Analytics Management.

#### Author: 

Alizée Wickenheiser

## Dependencies

* Node.js
* PM2
* Nginx
* Let's Encrypt
* MongoDB

## Instructions

* npm install
* npm run compile
* pm2 start npm -- run server

### NGINX

/etc/nginx/sites-available/venomous

```
server {

    server_name loris.ca
                www.loris.ca;

    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_pass http://localhost:5000;
    }

    location /socket.io/ {
        proxy_pass http://localhost:6660;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

### THANK YOU..

All the node_modules, libraries, and fonts making this possible. ♥️