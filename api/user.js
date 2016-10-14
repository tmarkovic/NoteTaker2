'use strict';

var User = require('../models/user');
var session = require('../lib/session');

/**
 * checks if username is available
 *
 * @param {string} username username to check
 */
function isUsernameAvailable(username) {
    return !User.findByUsername(username);
}

/**
 * validate the new user form
 *
 * @param  {Object} newUser user form
 * @return {Object}         validated form object or object with an error property
 */
function validateNewUserForm(newUser) {
    var requiredField = ['username', 'password', 'passwordConfirmation'];

    try {
        // validate that all fields is present
        requiredField.forEach(function (f) {
            if (newUser[f] === undefined || newUser[f] === '') {
                throw { error: f + ' is missing', errorField: f };
            }
        });

        // validates that the password match passwordConfirmation
        if (newUser.password !== newUser.passwordConfirmation) {
            throw { error: 'password does not match password confirmation', errorField: 'passwordConfirmation' };
        }

        // validates that the username is avaliable
        if (!isUsernameAvailable(newUser.username)) {
            throw { error: 'username is taken', errorField: 'username' };
        }

    } catch (e) {
        return e;
    }

    return {
        username: newUser.username,
        password: newUser.password
    };
}

/**
 * create a new user
 *
 * @param {Object} req request
 * @param {Object} res response
 */
exports.createUser = function (req, res) {
    console.log(req.body);
    var userForm = validateNewUserForm(req.body);
    if(!userForm.error) {
        var user = User.create(userForm);
        res.status(201).send();
    } else {
        res.status(400).send(userForm);
    }
};

/**
 * checks if a given username is taken
 *
 * @param {Object} req request
 * @param {Object} res response
 */
exports.checkUsername = function (req, res) {
    var username = req.params.username;
    res.status(200).send( {
        username: username,
        available: isUsernameAvailable(username)
    });
};
