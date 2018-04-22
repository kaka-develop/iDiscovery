(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$state', 'entity'];

    function ReportDetailController($scope, $state, entity) {
        var vm = this;
        vm.report = entity;
    
    }
})();