'use strict';

var uuid = require('uuid');

// super advanced note storage engine
var notes = [];

module.exports = {
    /**
     * get the note data with a specific id and user id
     *
     * @param  {String} id     note id
     * @param  {String} userId user id
     * @return {Object}        found note data
     */
    get: function (id, userId) {
        var note = notes.filter(function (n) {
            return n.id === id.toLowerCase() &&
                   n.userId === userId.toLowerCase();
        })[0];

        if(!note) {
            throw new Error('Note could not be found!');
        }

        return note;
    },

    /**
     * remove a note data object from storage
     *
     * @param  {Object} sourceObject stored object
     * @return {Object}              removed object
     */
    destroy: function (sourceObject) {
        var index = notes.indexOf(sourceObject);
        if(index !== -1) {
            notes.splice(index, 1);
        }
    },

    /**
     * create a note data object by giving it an id
     * and adding it to storage
     *
     * @param  {Object}   noteObject note data
     * @return {Object}              stored object(same object)
     */
    create: function (noteObject) {
        noteObject.id = uuid.v4();
        notes.push(noteObject);

        return noteObject;
    },

    /**
     * get all stored note data with a specified user id
     *
     * @param {String} userId user id to filter on
     */
    getNotesForUser: function (userId) {
        return notes.filter(function (n) {
            return n.userId === userId;
        }).map(function (n) {
            return {
                id: n.id,
                title: n.title,
                color: n.color
            };
        });
    }
};
