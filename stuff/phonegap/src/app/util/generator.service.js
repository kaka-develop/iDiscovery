(function () {
    'use strict';
    angular
        .module('iDiscoveryApp')
        .factory('GeneratoreService', GeneratoreService);

    GeneratoreService.$inject = [];

    function GeneratoreService() {
        var instance = {
            generateID: generateID
        };


        function generateID() {
            this.length = 16;
            this.timestamp = +new Date;
            var ts = this.timestamp.toString();
            var parts = ts.split('').reverse();
            var id = '';

            var _getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            
            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }

            return id;
        }
        return instance;
    }
})();