'use strict';

var usersDataStore = require('../dataaccess/users');

/**
 * constructor of the user model
 *
 * @param {Object} userObj user properties
 */
function User(userObj) {
    var user = userObj || {};
    this.username = user.username;
    this.password = user.password;
    this.id = user.id;
}

/**
 * find user data wrapped in a user model on username
 *
 * @param  {String} username username
 * @return {Object}          user model
 */
User.findByUsername = function (username) {
    var user = usersDataStore.findByUsername(username);
    if (user) user = new User(user);

    return user;
};

/**
 * save user data to storage engine and return a user model wrapped reprensentation
 *
 * @param  {String} username username
 * @return {Object}          user model
 */
User.create = function (userObject) {
    var storedUser = usersDataStore.create(userObject);
    return new User(storedUser);
};

User.prototype = Object.create({
    // link up the constructor
    constructor: User,

    /**
     * check if a given password maches the stored one
     *
     * @param  {String}  password password to match
     * @return {Boolean}          true if password match
     */
    authenticate: function (password) {
        return password === this.password;
    }
});

module.exports = User;
