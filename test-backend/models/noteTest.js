var rewire = require('rewire');
var assert = require('assert');
var Note = rewire('../../models/note');

describe('Note', function () {
    var notesDataAccessStub, testUserId, testNoteData, newId;

    beforeEach(function () {
        testUserId = '123';

        testNoteData = {
            id: '321',
            title: 'title',
            text: 'text',
            userId: testUserId
        };

        notesDataAccessStub = {
            get: function () {
                return testNoteData;
            },
            getNotesForUser: function () {
                return [testNoteData];
            },
            create: function (obj) {
                newId = 'newId';
                testNoteData.id = newId;
                return testNoteData;
            }
        };

        Note.__set__('notesDataAccess', notesDataAccessStub);
    });

    describe('Notes()', function () {
        it('should create a note object with correct attributes', function () {
            testNoteData.other = 'test';
            var note = new Note(testNoteData);
            assert.strictEqual(note.id, testNoteData.id);
            assert.strictEqual(note.title, testNoteData.title);
            assert.strictEqual(note.text, testNoteData.text);
            assert.strictEqual(note.userId, testNoteData.userId);
            assert.strictEqual(note.other, undefined);
        });
    });

    describe('#get', function () {
        it('should wrapp note with the Note contructor', function () {
            var note = Note.get(testNoteData.id, testNoteData.id);
            assert(note instanceof Note);
        });
    });

    describe('#getNotesForUser', function () {
        it('should fetch user notes as note objects', function () {
            var notes = Note.getNotesForUser(testUserId);
            assert.strictEqual(notes.length, 1);
            assert(notes[0] instanceof Note);
        });
    });

    describe('#create', function () {
        it('should persist data and get an id', function () {
            delete testNoteData.id;
            assert.strictEqual(testNoteData.id, undefined);
            var note = Note.create(testNoteData);
            assert(note instanceof Note);
            assert.strictEqual(note.id, newId);
        });
    });
});
