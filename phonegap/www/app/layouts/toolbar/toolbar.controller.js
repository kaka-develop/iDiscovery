(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$state'];

    function ToolbarController($state) {
        var vm = this;
        vm.currentState = $state.current.name;
        if(!vm.currentState)
            vm.currentState = 'home';
    }

})();