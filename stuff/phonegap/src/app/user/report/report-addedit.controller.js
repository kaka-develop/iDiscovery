(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportAddEditController', ReportAddEditController);

    ReportAddEditController.$inject = ['$scope', '$state', 'entity', 'ReportService', '$mdDialog', 'EventService', 'AlertService'];

    function ReportAddEditController($scope, $state, entity, ReportService, $mdDialog, EventService, AlertService) {
        var vm = this;

        vm.report = entity;
        vm.submit = submit;
        vm.events = [];

        loadAllEvents();

        function loadAllEvents() {
            EventService.all().then(function (value) {
                vm.events = value;
            });
        }

        function submit() {
            ReportService.isEventExisted(vm.report.event_id).then(function (value) {
                if (!value)
                    showDialog();
                else {
                    vm.report.event_id = null;
                    AlertService.error("This event already has a report!");
                }
            });

        }

        function showDialog() {
            $mdDialog.show({
                templateUrl: 'app/user/report/report-dialog.html',
                controller: 'ReportDialogController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {
                    entity: [function () {
                        return vm.report;
                    }]
                }
            });
        }

    }
})();