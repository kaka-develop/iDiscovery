(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('ReportService', ReportService);

    ReportService.$inject = ['ReportTableService'];

    function ReportService(ReportTableService) {
        var instance = {
            all: all,
            add: add,
            del: del,
            get: get,
            update: update,
            search: search,
            getByEventId: getByEventId,
            isEventExisted: isEventExisted
        };

        function all() {
            return ReportTableService.all();
        }

        function add(item) {
            return ReportTableService.insert(item);
        }

        function get(id) {
            return ReportTableService.get(id);
        }

        function update(item) {
            return ReportTableService.update(item);
        }


        function getByEventId(id) {
            return ReportTableService.getByEventId(id);
        }

        function del(id) {
            return ReportTableService.del(id);
        }

        function search(field, text) {
            return ReportTableService.search(field, text);
        }

        function isEventExisted(id){
            return ReportTableService.isEventExisted(id);
        }

        return instance;
    }
})();