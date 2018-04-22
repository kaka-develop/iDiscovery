(function() {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('AlertController', AlertController);

    AlertController.$inject = ['$scope','params'];

    function AlertController ($scope,params) {
        var vm = this;
        vm.msg = params.msg;
    }
})();
