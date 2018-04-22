(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('ReportTableService', ReportTableService);

    ReportTableService.$inject = ['DatabaseService', 'GeneratoreService', '$q'];

    function ReportTableService(DatabaseService, GeneratoreService, $q) {
        var instance = {
            all: all,
            insert: insert,
            get: get,
            del: del,
            update: update,
            search: search,
            getByEventId: getByEventId,
            isEventExisted: isEventExisted
        };

        var db = DatabaseService.getDB();

        function all() {
            var promise = $q(function (resolve) {
                var list = [];
                var query = 'SELECT * FROM report';
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var item = results.rows.item(i);
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
                var query = 'INSERT INTO report(id,person_number,topic,description,event_id) VALUES (?,?,?,?,?)';
                db.transaction(function (tx) {
                    item.id = GeneratoreService.generateID();
                    var data = [item.id, item.person_number, item.topic, item.description, item.event_id];
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
                var query = 'SELECT * FROM report WHERE id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function (tx, results) {
                        var length = results.rows.length;
                        for (var i = 0; i < length; i++) {
                            item = results.rows.item(0);
                            break;
                        }
                        resolve(item);
                    });
                });
            });
            return promise;
        }

        function getByEventId(id) {
            var promise = $q(function (resolve) {
                var item = null;
                var query = 'SELECT * FROM report WHERE event_id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function (tx, results) {
                        var length = results.rows.length;
                        for (var i = 0; i < length; i++) {
                            item = results.rows.item(0);
                            break;
                        }
                        resolve(item);
                    });
                });
            });
            return promise;
        }

        function isEventExisted(id) {
            var promise = $q(function (resolve) {
                var query = 'SELECT * FROM report WHERE event_id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function (tx, results) {
                        var length = results.rows.length;
                        if (length == 0)
                            resolve(false);
                        else
                            resolve(true);
                    });
                });
            });
            return promise;
        }

        function del(id) {
            var promise = $q(function (resolve) {
                var query = 'DELETE FROM report WHERE id=?';
                db.transaction(function (tx) {
                    tx.executeSql(query, [id], function () {
                        resolve(true);
                    });
                });
            });
            return promise;
        }

        function search(field, text) {
            var promise = $q(function (resolve) {
                var list = [];
                var query = "SELECT * FROM report WHERE " + field + " LIKE '%" + text + "%'";

                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {
                        for (var i = 0; i < results.rows.length; i++) {
                            var item = results.rows.item(i);
                            list.push(item);
                        }
                        resolve(list);
                    });
                });
            });
            return promise;
        }

        function update(item) {
            var promise = $q(function (resolve) {
                var query = 'UPDATE report SET person_number=?, topic=?, description=?, event_id=?';
                db.transaction(function (tx) {
                    var data = [item.person_number, item.topic, item.description, item.event_id, item.id];
                    tx.executeSql(query, data, function () {
                        resolve(true);
                    });
                });
            });
            return promise;
        }

        return instance;
    }
})();