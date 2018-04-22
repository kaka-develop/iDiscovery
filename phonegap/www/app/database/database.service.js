(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('DatabaseService', DatabaseService);

    DatabaseService.$inject = ['$window', 'GeneratoreService', 'ConvertService'];

    function DatabaseService($window, GeneratoreService, ConvertService) {

        var instance = {
            initialize: initialize,
            getDB: getDB,
            initializeForTests: initializeForTests
        };

        var db = null;

        function initialize() {
            db = $window.openDatabase('idiscovery_db', '1.0', 'iDiscovery database', 2 * 1024 * 1024, firstCreate);

            function firstCreate() {
                createTables();
            }
        }

        function initializeForTests() {
            var dbName = (new Date()).getTime() + "_test_db";
            db = openDatabase(dbName, "1.0", "Database for testing", 1024 * 1024, firstCreate);
            function firstCreate() {
                createTables();
            }
        }

        function getDB() {
            return db;
        }

        function createTables() {
            // create table events
            createEventTable();

            // create table report
            createReportTable();
        }

        function createEventTable() {
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE event (' +
                    'id INTEGER NOT NULL UNIQUE,' +
                    'activity_name TEXT NOT NULL,' +
                    'reporter_name TEXT NOT NULL,' +
                    'activity_date DATE NOT NULL,' +
                    'activity_location TEXT,' +
                    'attending_time DATETIME' +
                    ')', null, onSuccess);
            });

            function onSuccess() {
                insertDefaultEvents();
            }
        }

        function insertDefaultEvents() {
            var query = 'INSERT INTO event(id,activity_name,reporter_name,activity_date,activity_location,attending_time) VALUES (?,?,?,?,?,?)';
            db.transaction(function (tx) {
                var data = [2131214121213, 'Running', 'John Terry', ConvertService.convertDateToString(new Date()), '15 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [123129312812, 'Eating', 'Recardo Kaka', ConvertService.convertDateToString(new Date()), '10 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [9912121894121021, 'Playing football', 'Cristinano Ronaldo', ConvertService.convertDateToString(new Date()), '25 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 'Watching movies', 'Eden Hazard', ConvertService.convertDateToString(new Date()), '27 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 'Easy communication', 'Lion Messi', ConvertService.convertDateToString(new Date()), '28 Street London', ConvertService.convertDateToString(new Date())];
                tx.executeSql(query, data);
            });
        }

        function createReportTable() {
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE report (' +
                    'id INTEGER NOT NULL UNIQUE,' +
                    'person_number INT NOT NULL,' +
                    'topic TEXT NOT NULL,' +
                    'description TEXT NOT NULL,' +
                    'event_id INT NOT NULL,' +
                    'FOREIGN KEY (event_id) REFERENCES event(id)' +
                    ')', null, onSuccess);
            });

            function onSuccess() {
                insertDefaultReports();
            }
        }

        function insertDefaultReports() {
            var query = 'INSERT INTO report VALUES (?,?,?,?,?)';
            db.transaction(function (tx) {
                var data = [GeneratoreService.generateID(), 50, 'Good cooking', 'This is great event I have not ever participate. During event, I join cooking, eating and drawing contests.', 2131214121213];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 100, 'Having fun', 'This is great event I have not ever participate. During event, I join dancing and joking contests.', 123129312812];
                tx.executeSql(query, data);

                data = [GeneratoreService.generateID(), 200, 'Sports for health', 'This is great event I have not ever participate. During event, I join playing football, tenis and golf.', 9912121894121021];
                tx.executeSql(query, data);
            });
        }


        return instance;
    }
})();