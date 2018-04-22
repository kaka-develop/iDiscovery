'use strict';

describe('Database service tests', function () {
    beforeEach(module('iDiscoveryApp'));


    describe('DatabaseServie', function () {
        var databaseService;

        beforeEach(inject(function (DatabaseService) {
            databaseService = DatabaseService;
            databaseService.initializeForTests();
        }));


        it('Should have database not null', function () {
            expect(databaseService.getDB()).not.toBeNull();
        });

    });
});