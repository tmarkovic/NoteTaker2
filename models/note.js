'use strict';

var notesDataAccess = require('../dataaccess/notes');

// helper array used in Note constructor function
var noteFields = ['id', 'userId', 'title', 'text', 'color'];

/**
 * constructor function of the note model
 *
 * @param {Object} noteObj note properties
 */
function Note(noteObj) {
    var note = this;

    noteFields.forEach(function (field) {
        note[field] = noteObj[field];
    });

    note._sourceData = noteObj;
}

Note.prototype = Object.create({
    // set the constructor property
    constructor: Note,

    /**
     * update source data to reflect the changes on the model
     */
    save: function () {
        this._sourceData.title = this.title;
        this._sourceData.text = this.text;
        this._sourceData.color = this.color;
    },

    /**
     * remove source data from storage
     */
    destroy: function () {
        notesDataAccess.destroy(this._sourceData);
    }
});

/**
 * get a note model wrapped note data object belonging to a specified user
 *
 * @param  {String} noteId note id
 * @param  {String} userId user id
 * @return {Object}        note model warapped note data
 */
Note.get = function (noteId, userId) {
    return new Note(notesDataAccess.get(noteId, userId));
};

/**
 * add note data to storage engine and wrappit and return it
 *
 * @param  {Object} noteData note data
 * @return {Object}          note model wrapped note data
 */
Note.create = function (noteData) {
    return new Note(notesDataAccess.create(noteData));
};

/**
 * get all note data for a specified user wrapped in note models
 *
 * @param {String} userId user id
 */
Note.getNotesForUser = function (userId) {
    return notesDataAccess.getNotesForUser(userId).map(function (noteData) {
        return new Note(noteData);
    });
};

module.exports = Note;
