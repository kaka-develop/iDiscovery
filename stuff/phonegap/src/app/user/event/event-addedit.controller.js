(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventAddEditController', EventAddEditController);

    EventAddEditController.$inject = ['$scope', '$state', 'entity', 'EventService','$mdDialog'];

    function EventAddEditController($scope, $state, entity, EventService,$mdDialog) {
        var vm = this;

        vm.event = entity;
        vm.submit = submit;

        function submit() {
            showDialog();
        }

        function showDialog() {
            $mdDialog.show({
                templateUrl: 'app/user/event/event-dialog.html',
                controller: 'EventDialogController',
                controllerAs: 'vm',
                clickOutsideToClose: true,
                fullscreen: false,
                resolve: {
                    entity: [function() {
                        return vm.event;
                    }]
                }
            });
        }
        
    }
})();