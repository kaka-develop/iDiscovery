(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('EventService', EventService);

    EventService.$inject = ['EventTableService'];

    function EventService(EventTableService) {
        var instance = {
            all: all,
            add: add,
            del: del,
            get: get,
            update: update,
            search: search
        };
        
        function all() {
            return EventTableService.all();
        }

        function add(item) {
            return EventTableService.insert(item);
        }

        function get(id) {
            return EventTableService.get(id);
        }

        function update(item) {
            return EventTableService.update(item);
        }

        function del(id) {
            return EventTableService.del(id);
        }

        function search(field,text,startDate,endDate){
            return EventTableService.search(field,text,startDate,endDate);
        }

        return instance;
    }
})();