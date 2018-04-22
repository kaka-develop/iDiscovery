(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];


    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'toolbar@': {
                    templateUrl: 'app/layouts/toolbar/toolbar.html',
                    controller: 'ToolbarController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();