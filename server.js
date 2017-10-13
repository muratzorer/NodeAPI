// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const database = require('./config/database');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(database.url, (err, db) => {
    if (err) return console.log(err);

    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});