(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('EventTableService', EventTableService);

    EventTableService.$inject = ['DatabaseService', 'GeneratoreService', 'ConvertService', '$q'];

    function EventTableService(DatabaseService, GeneratoreService, ConvertService, $q) {
        var instance = {
            all: all,
            insert: insert,
            get: get,
            del: del,
            update: update,
            search: search
        };

        var db = DatabaseService.getDB();

        function all() {
            var promise = $q(function (resolve) {
                var list = [];
                var query = 'SELECT * FROM event';
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var item = results.rows.item(i);
                            item['activity_date'] = new Date(item.activity_date);
                            item['attending_time'] = new Date(item.attending_time);
                            list.push(item);
                        }
                        resolve(list);
                    });
                });
            });
            return promise;
        }

        function insert(item) {
            var promise = $q(function (resolve) {
                var query = 'INSERT INTO event(id,activity_name,reporter_name,activity_date,activity_location,attending_time) VALUES (?,?,?,?,?,?)';
                db.transaction(function (tx) {
                    item.id = GeneratoreService.generateID();
                    var data = [item.id, item.activity_name, item.reporter_name, ConvertService.convertDateToString(item.activity_date), item.activity_location, ConvertService.convertDateToString(item.attending_time)];
                    tx.executeSql(query, data, function () {
                        resolve(true);
                    });
                });
            });

            return promise;
        }

        function get(id) {
            var promise = $q(function (resolve) {
                var item = null;
                var query = 'SELECT * FROM event WHERE id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function (tx, results) {
                        var length = results.rows.length;
                        for (var i = 0; i < length; i++) {
                            item = results.rows.item(0);
                            item['activity_date'] = new Date(item.activity_date);
                            item['attending_time'] = new Date(item.attending_time);
                            break;
                        }
                        resolve(item);
                    });
                });
            });
            return promise;
        }

        function del(id) {
            var promise = $q(function (resolve) {
                var query = 'DELETE FROM event WHERE id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function () {
                        resolve(true);
                    });
                });
            });
            return promise;
        }

        function update(item) {
            var promise = $q(function (resolve) {
                var query = 'UPDATE event SET activity_name=?, reporter_name=?, activity_date=?, activity_location=?, attending_time=? WHERE id=?';
                db.transaction(function (tx) {
                    var data = [item.activity_name, item.reporter_name, ConvertService.convertDateToString(item.activity_date), item.activity_location, ConvertService.convertDateToString(item.attending_time),item.id];
                    tx.executeSql(query, data, function () {
                        resolve(true);
                    });
                });
            });
            return promise;
        }

        function search(field, text, startDate, endDate) {
            var promise = $q(function (resolve) {
                var list = [];
                var query = "SELECT * FROM event WHERE " + field + " LIKE '%" + text + "%'";
                if (startDate != null && endDate == null)
                    query = "SELECT * FROM event WHERE " + field + " LIKE '%" + text + "%' and activity_date >= '" + ConvertService.convertDateToString(startDate) + "'";
                if (startDate == null && endDate != null)
                    query = "SELECT * FROM event WHERE " + field + " LIKE '%" + text + "%' and activity_date <= '" + ConvertService.convertDateToString(endDate) + "'";
                if (startDate != null && endDate != null)
                    query = "SELECT * FROM event WHERE " + field + " LIKE '%" + text + "%' and activity_date between '" + ConvertService.convertDateToString(startDate) + "' and '"+ ConvertService.convertDateToString(endDate) + "'";
                    
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var item = results.rows.item(i);
                            item['activity_date'] = new Date(item.activity_date);
                            item['attending_time'] = new Date(item.attending_time);
                            list.push(item);
                        }
                        resolve(list);
                    });
                });
            });
            return promise;
        }

        return instance;
    }
})();