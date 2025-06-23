require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const database = require('./db/db');
const routes = require('./routes/routes');

const keyPath = process.env.SSL_KEY_PATH;
const certPath = process.env.SSL_CERT_PATH;

const credentials = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

try {
    database.sync().then(() => {
        https.createServer(credentials, app).listen(443, () => {
            console.log('Server started on port 443');
        });
    });

} catch (error) {
    console.log('Error: ' + error);
}