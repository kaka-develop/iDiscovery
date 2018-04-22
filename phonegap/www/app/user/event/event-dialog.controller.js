(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventDialogController', EventDialogController);

    EventDialogController.$inject = ['$scope', '$state', 'entity', 'EventService', '$mdDialog'];

    function EventDialogController($scope, $state, entity, EventService, $mdDialog) {
        var vm = this;

        vm.event = entity;
        vm.save = save;
        vm.closeDialog = closeDialog;

        function closeDialog() {
            $mdDialog.cancel('cancel');
        }

        function save() {
            if (vm.event.id == null)
                EventService.add(vm.event);
            else
                EventService.update(vm.event);

            $mdDialog.hide();
            $state.go('event', null, {
                reload: 'event'
            });
        }
    }
})();