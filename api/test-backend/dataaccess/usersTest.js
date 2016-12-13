var rewire = require('rewire');
var usersDataStore = rewire('../../dataaccess/users');
var assert = require('assert');

describe('users data access', function () {
    var testUsers;

    beforeEach(function () {
        testUsers = [];
        usersDataStore.__set__('users', testUsers);
    });

    describe('#get', function () {
        var testUser = {
            username: 'username',
            password: 'password',
            id: '123'
        };

        it('should get a user with a given id', function () {
            testUsers.push(testUser);
            assert.deepEqual(usersDataStore.get(testUser.id), testUser);
        });

        it('should throw error on missing id', function () {
            assert.throws(function () {
                usersDataStore.get(testUser.id);
            });
        });
    });

    describe('#findByUsername', function () {
        var testUser = {
            username: 'username',
            password: 'password',
            id: '123'
        };

        it('should find a user with a given username', function () {
            testUsers.push(testUser);
            assert.deepEqual(usersDataStore.findByUsername(testUser.username), testUser);
        });

        it('should return null when username not found', function () {
            assert.strictEqual(usersDataStore.findByUsername(testUser.username), null);
        });
    });

    describe('#create', function () {
        var newUser;
        var createdUser;

        beforeEach(function () {
            newUser = {
                username: 'user',
                password: 'pass'
            };

            createdUser = usersDataStore.create(newUser);
        });

        it('should return created user with generated id', function () {
            assert(typeof createdUser.id === 'string');
            newUser.id = createdUser.id;
            assert.deepEqual(createdUser, newUser);
        });

        it('should add new user to the user collection', function () {
            assert.equal(testUsers.length, 1);
        });
    });
});
