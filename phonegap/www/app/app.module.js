(function () {
    'use strict';

    angular
        .module('iDiscoveryApp', [
            'ngMaterial',
            'ui.router',
            'ngMessages',
            'mdPickers',
            'ngCordova'
        ])
        .run(run);
    
    run.$inject = ['DatabaseService','$state'];

    function run(DatabaseService,$state) {
        DatabaseService.initialize();
        $state.go('home');
    }
})();