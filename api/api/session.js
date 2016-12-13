'use strict';

var User = require('../models/user');
var session = require('../lib/session');

/**
 * create a authentication token
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var user = User.findByUsername(username);

    if (user && user.authenticate(password)) {
        var tokenObject = {
            id: user.id
        };

        var token = session.encode(tokenObject);

        res.status(200).send(token);
    } else {
        res.status(401).send();
    }
};
