'use strict';

var express = require('express');
var app = express();
var path = require('path');
var api = require('./api');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan  = require('morgan');
var settings = require('./config.json');

// serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// connect logger middleware (this will not include requests of static files as
// this is added after the static middleware)
app.use(morgan('tiny'));

// parse the request payload and add it to the request body property
app.use(bodyParser.json());

//enable CORS
app.use(cors());

// mount the api
app.use('/api', api);

// serve 404 message when no action matches the path
app.use(function (req, res) {
    res.status(404).send('File not found!');
});



// start server
app.listen(process.env.PORT || settings.port, function () {
    console.log('listening on port: ' + settings.port);
});
