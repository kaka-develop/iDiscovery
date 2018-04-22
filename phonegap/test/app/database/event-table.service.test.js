'use strict';

describe('Event table tests', function () {
    beforeEach(module('iDiscoveryApp'));


    describe('EventTable', function () {
        var eventService;
        var event = {
            id: null,
            activity_name: 'AAAAAA',
            reporter_name: "AAAAAA",
            activity_location: 'AAAAAA',
            attending_time: new Date(),
            activity_date: new Date()
        };

        beforeEach(inject(function (DatabaseService,EventTableService) {
            DatabaseService.initializeForTests();
            eventService = EventTableService;
            eventService.insert(event).then(function (result) {
                expect(result).toBeTruthy();
            });
        }));


        it('Should have all events', function () {
            eventService.all().then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });
        });

        it('Should get an event', function () {
            eventService.get(event.id).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.activity_name).toEqual(event.activity_name);
            });
        });

        it('Should delete an event', function () {
            eventService.del(event.id).then(function (result) {
                expect(result).toBeTruthy();
            });
        });

        it('Should update an event', function () {
            event['activity_name'] = "BBBBBB";
            eventService.update(event).then(function (result) {
                expect(result).toBeTruthy();
            });
        });


        it('Should search list of events', function () {
            // search empty by activity_name
            var field = 'activity_name';
            var text = '';
            eventService.search(field, text).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });

            // search text by activity_location
            field = 'activity_location';
            text = 'a';
            eventService.search(field, text).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });

            // search text by activity_location and start and end date
            var start = new Date();
            var end = new Date();
            eventService.search(field, text, start, end).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });
        });


    });
});