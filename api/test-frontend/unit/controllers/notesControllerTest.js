describe('notesController', function () {

    var scope;
    var location = {
        path: function (){},
        replace: function (){}
    };

    beforeEach(module('notetakerApp'));

    beforeEach(inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
    }));

    it('should redirect unless logged in', inject(function ($controller) {

        spyOn(location, 'path');
        spyOn(location, 'replace');

        $controller('notesController', {
            $scope: scope,
            $location: location
        });

        expect(location.path).toHaveBeenCalledWith('/');
        expect(location.replace).toHaveBeenCalledWith();
    }));

    describe('as logged in', function () {
        beforeEach(inject(function ($controller) {
            scope.isLoggedIn = true;

            $controller('notesController', {
                $scope: scope,
                $location: location
            });
        }));

        it('should not redirect to start page', inject(function ($controller) {
            spyOn(location, 'path');
            spyOn(location, 'replace');

            $controller('notesController', {
                $scope: scope,
                $location: location
            });

            expect(location.path).not.toHaveBeenCalledWith('/');
            expect(location.replace).not.toHaveBeenCalledWith();
        }));
    });

});
