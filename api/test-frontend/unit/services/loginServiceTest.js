describe('Login Service', function () {
    var $rootScope, loginService, $httpBackend;

    beforeEach(module('notetakerApp'));

    beforeEach(inject(function (_$rootScope_, _loginService_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        loginService = _loginService_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenPOST('/api/login').respond('loginToken');
        loginService.logout();
    }));

    afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
    });

    it('should not start as logged in', function () {
        expect(loginService.checkLoginStatus()).toBe(false);
    });

    it('should be able to login', function () {
        var loginSuccess = false;
        loginService.login('test', 'test', function (success) {
            loginSuccess = success;
        });
        $httpBackend.flush();
        expect(loginService.checkLoginStatus()).toBe(true);
    });

    it('should be able to logout', function () {
        expect(loginService.checkLoginStatus()).toBe(false);
        loginService.login('test', 'test', function (success) {});
        $httpBackend.flush();
        expect(loginService.checkLoginStatus()).toBe(true);
        loginService.logout();
        expect(loginService.checkLoginStatus()).toBe(false);
    });

    it('should broadcast event on login', function () {
        spyOn($rootScope, '$broadcast');
        loginService.login('test', 'test', function (success) {});
        $httpBackend.flush();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(loginService.loginStatusChangeEventName);
    });

    it('should broadcast event on login', function () {
        loginService.login('test', 'test', function (success) {

        });
        $httpBackend.flush();
        spyOn($rootScope, '$broadcast');
        loginService.logout();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(loginService.loginStatusChangeEventName);
    });
});
