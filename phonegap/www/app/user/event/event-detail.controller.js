(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$state', 'entity'];

    function EventDetailController($scope, $state, entity) {
        var vm = this;
        vm.event = entity;

    }
})();