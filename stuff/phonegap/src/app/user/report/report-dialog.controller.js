(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportDialogController', ReportDialogController);

    ReportDialogController.$inject = ['$scope', '$state', 'entity', 'ReportService', '$mdDialog'];

    function ReportDialogController($scope, $state, entity, ReportService, $mdDialog) {
        var vm = this;

        vm.report = entity;
        vm.save = save;
        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.cancel('cancel');
        }

        function save() {
            if (vm.report.id == null)
                ReportService.add(vm.report);
            else
                ReportService.update(vm.report);

            $mdDialog.hide();
            $state.go('report', null, {
                reload: 'report'
            });
        }
    }
})();