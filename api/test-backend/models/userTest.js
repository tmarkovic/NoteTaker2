var assert = require('assert');
var rewire = require('rewire');
var User = rewire('../../models/user');

describe('User', function () {
    var dataStoreStub, testUser;

    beforeEach(function () {
        testUser = { username: 'testUser', password: 'testPass', id: '123' };

        dataStoreStub = {
            create: function () {
                return testUser;
            },
            findByUsername: function () {
                return testUser;
            }
        };

        User.__set__('usersDataStore', dataStoreStub);
    });

    describe('#create', function () {
        it('should return the created user as a User-object', function () {
            var result = User.create();
            assert(result instanceof User);
        });
    });

    describe('#findByUsername', function () {
        it('should return the found user as an User-object', function () {
            var result = User.findByUsername();
            assert(result instanceof User);
        });
    });
});
