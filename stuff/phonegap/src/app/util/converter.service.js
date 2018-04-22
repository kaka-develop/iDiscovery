(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('ConvertService', ConvertService);

    ConvertService.$inject = [];

    function ConvertService() {
        var instance = {
            convertDateToString: convertDateToString
        };

        function convertDateToString(date) {
            var result = date.toISOString().substring(0, 10);
            return result;
        }
        return instance;
    }
})();