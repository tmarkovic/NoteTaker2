'use strict';

var Note = require('../models/note');

/**
 * middleware for loading a note based on the noteId parameter
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 * @param {Function} next   next action in chain
 * @param {String}   noteId id of the requested note
 */
exports.getNoteFromId = function (req, res, next, noteId) {
    req.note = Note.get(noteId, req.user.id);
    if (!req.note) res.status(404).send();
    else next();
};

/**
 * list of titles and ids of a users notes
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.list = function (req, res) {
    var notes = Note.getNotesForUser(req.user.id);
    res.status(200).send(notes);
};

/**
 * get a specific note
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.get = function (req, res) {
    res.status(200).send(req.note);
};

/**
 * create a new note for the user
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.create = function (req, res) {
    var noteData = req.body.noteData;
    noteData.userId = req.user.id;
    var note = Note.create(noteData);
    res.status(201).send(note);
};

/**
 * destroy a specified note of the users notes
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.destroy = function (req, res) {
    req.note.destroy();
    res.status(200).send(req.note);
};

/**
 * update a specified note of the users notes
 *
 * @param {Object}   req    request
 * @param {Object}   res    response
 */
exports.update = function (req, res) {
    var noteData = req.body.noteData;
    req.note.title = noteData.title;
    req.note.text = noteData.text;
    req.note.save();
    res.status(200).send(req.note);
};
