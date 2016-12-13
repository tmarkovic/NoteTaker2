'use strict';

var jwt = require('jwt-simple');
var uuid = require('uuid');

// as our "database" gets wiped between restarts we want to invalidate all
// tokens. Therefor we generate a new secret on every start.
var secret = uuid.v4();

module.exports = {
    /**
     * generate a token with using the secret
     *
     * @param  {Object} obj object to include in token
     * @return {String}     token
     */
    encode: function (obj) {
        return jwt.encode(obj, secret);
    },

    /**
     * unpack contained data form token using the secret
     *
     * @param  {String} token   token
     * @return {Object}         contained data
     */
    decode: function (token) {
        return jwt.decode(token, secret);
    }
};
