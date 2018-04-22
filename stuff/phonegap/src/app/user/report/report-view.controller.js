(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportViewController', ReportViewController);

    ReportViewController.$inject = ['$scope', '$state', 'EventService','ReportService'];

    function ReportViewController($scope, $state, EventService,ReportService) {
        var vm = this;
        vm.events = [];
        vm.event_id = null;
        vm.report = null;
        vm.findReport = findReport;
        loadAllEvents();

        function loadAllEvents() {
            EventService.all().then(function (value) {
                vm.events = value;
            });
        }


        function findReport() {
            ReportService.getByEventId(vm.event_id).then(function(value){
                vm.report = value;
            });
        }

    }
})();