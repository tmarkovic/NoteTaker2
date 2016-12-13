'use strict';

var api = require('express').Router();
var session = require('./session');
var user = require('./user');
var notes = require('./notes');
var auth = require('../middleware/auth');
var delay = require('../middleware/delay');

// path for getting a login token
api.post('/login', delay, session.login);

// path for creating new users
api.post('/users', delay, user.createUser);
// path for checking if a username is available
api.get('/users/check-availability/:username', delay, user.checkUsername);

// if a authentication-token is present in among the request headers unpack
// the tokendata and attach it to the request object
api.use(auth.unpack);

// add the note to the request body if one is requested
api.param('noteId', notes.getNoteFromId);

// routes for note management
api.get('/notes', delay, auth.requireLogin, notes.list);
api.get('/notes/:noteId', delay, auth.requireLogin, notes.get);
api.post('/notes', delay, auth.requireLogin, notes.create);
api.put('/notes/:noteId', delay, auth.requireLogin, notes.update);
api.delete('/notes/:noteId', delay, auth.requireLogin, notes.destroy);

// make the api avaliable for the consumer
module.exports = api;
