'use strict';

describe('Report table tests', function () {
    beforeEach(module('iDiscoveryApp'));


    describe('ReportTable', function () {
        var reportService;
        var event = {
            id: null,
            activity_name: 'AAAAAA',
            reporter_name: "AAAAAA",
            activity_location: 'AAAAAA',
            attending_time: new Date(),
            activity_date: new Date()
        };

        var report = {
            id: null,
            person_number: 30,
            topic: "AAAAAA",
            description: "AAAAAAA",
            event_id: null
        };

        beforeEach(inject(function (DatabaseService,EventTableService, ReportTableService) {
            DatabaseService.initializeForTests();
            reportService = ReportTableService;
            EventTableService.insert(event).then(function (eventResult) {
                expect(eventResult).toBeTruthy();
                report['event_id'] = event.id;
                ReportTableService.insert(report).then(function(reportResult){
                    expect(reportResult).toBeTruthy();
                });
            });
        }));


        it('Should have all reports', function () {
            reportService.all().then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });
        });

        it('Should get an report', function () {
            reportService.get(report.id).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.activity_name).toEqual(report.activity_name);
            });
        });

        it('Should delete an report', function () {
            reportService.del(report.id).then(function (result) {
                expect(result).toBeTruthy();
            });
        });

        it('Should update an report', function () {
            report['topic'] = "BBBBBB";
            reportService.update(report).then(function (result) {
                expect(result).toBeTruthy();
            });
        });


        it('Should search list of reports', function () {
            // search empty by topic
            var field = 'topic';
            var text = '';
            reportService.search(field, text).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });

            // search text by topic
            field = 'topic';
            text = 'a';
            reportService.search(field, text).then(function (result) {
                expect(result).not.toBeNull();
                expect(result.length).toEqual(1);
            });

        });
              
        it('Should have event existed', function() {
            reportService.isEventExisted(event.id).then(function(result) {
                expect(result).toBeTruthy();
            });
        });

        it('Should have report by event id', function() {
            reportService.getByEventId(event.id).then(function(result){
                expect(result).not.toBeNull();
                expect(result.topic).toEqual(report.topic);
            });
        });
            
    });
});