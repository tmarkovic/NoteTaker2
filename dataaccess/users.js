'use strict';

var uuid = require('uuid');

// super duper advanced storage engine
var users = [];

module.exports = {
    /**
     * get user data for a specific id
     *
     * @param  {String} id user id
     */
    get: function (id) {
        var user = users.filter(function (u) {
            return u.id === id.toLowerCase();
        })[0];

        if(!user) {
            throw new Error('User with user id not found!');
        }

        return user;
    },

    /**
     * create user data object by adding an id and pushing it into storage
     *
     * @param  {[type]}   userObject [description]
     * @param  {Function} callback   [description]
     * @return {[type]}              [description]
     */
    create: function (userObject, callback) {
        userObject.id = uuid.v4();
        users.push(userObject);

        return userObject;
    },

    /**
     * find user data by a given username (not case sensitive)
     *
     * @param  {String} username username to search for
     * @return {Object}          found user data or null
     */
    findByUsername: function (username) {
        return users.filter(function (u) {
            return u.username.toLowerCase() === username.toLowerCase();
        })[0] || null;
    }
};
