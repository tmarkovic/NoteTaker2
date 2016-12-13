'use strict';

var session = require('../lib/session');

/**
 * unpack user from authentication token and attach it to the request object
 *
 * @param  {Object}   req  request
 * @param  {Object}   res  response
 * @param  {Function} next next action
 */
exports.unpack = function (req, res, next) {
    var token = req.headers['authentication-token'];

    if (token) {
        try {
            req.user = session.decode(token);
        } catch (e) {
            res.status(498).send('token expired!');
            return;
        }
    }

    next();
};

/**
 * require a user to have been set on the request object or send a 401
 *
 * @param {Object}   req  request
 * @param {Object}   res  response
 * @param {Function} next next action
 */
exports.requireLogin = function (req, res, next) {
    if (!req.user) req.status(401).send();
    else next();
};
