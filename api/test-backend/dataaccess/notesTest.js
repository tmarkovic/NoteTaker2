var rewire = require('rewire');
var nds = rewire('../../dataaccess/notes');
var assert = require('assert');

describe('Notes data access', function () {
    var testNotes;
    var testUserId = '123';

    beforeEach(function () {
        testNotes = [];
        nds.__set__('notes', testNotes);
    });

    describe('#get', function () {
        var testNote;

        beforeEach(function () {
            testNote = {
                id: '987',
                title: 'title',
                text: 'text',
                userId: testUserId
            };

            testNotes.push(testNote);
        });

        it('should get the note when id and user id match', function () {
            assert.deepEqual(nds.get(testNote.id, testUserId), testNote);
        });

        it('should not get the note when user id is wrong', function () {
            assert.throws(function () {
                console.log(nds.get(testNote.id, 'missinguserid'));
            });
        });
    });

    describe('#getNotesForUser', function () {
        var usersNote;
        var otherNote;
        var fetchedNotes;

        beforeEach(function () {
            usersNote = {
                id: '987',
                title: 'title',
                text: 'text',
                userId: testUserId
            };

            otherNote = {
                id: '999',
                title: 'title',
                text: 'text',
                userId: 'missingUser'
            };

            testNotes.push(usersNote);
            testNotes.push(otherNote);
            testNotes.push({
                id: '111',
                title: 'title',
                text: 'text',
                userId: testUserId
            });

            testNotes.push({
                id: '1821',
                title: 'title',
                text: 'text',
                userId: testUserId
            });

            fetchedNotes = nds.getNotesForUser(testUserId);
        });

        it('should fetch notes belonging to user', function () {
            var noteIds = fetchedNotes.map(function (n) {
                return n.id;
            });

            assert.equal(fetchedNotes.length, 3);
            assert(noteIds.indexOf(usersNote.id) !== -1);
        });

        it('should only include title and id', function () {
            fetchedNotes.forEach(function (note) {
                assert.strictEqual(typeof note.text, 'undefined');
                assert.strictEqual(typeof note.userId, 'undefined');
                assert.strictEqual(typeof note.id, 'string');
                assert.strictEqual(typeof note.title, 'string');
            });
        });
    });
});
