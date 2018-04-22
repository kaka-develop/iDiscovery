(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];


    function stateConfig($stateProvider) {
        $stateProvider
            .state('report', {
                parent: 'user',
                views: {
                    'content@': {
                        templateUrl: 'reports.html',
                        controller: 'ReportController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('report.new', {
                views: {
                    'content@': {
                        templateUrl: 'report-addedit.html',
                        controller: 'ReportAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: [function () {
                        var entity = {
                            id: null,
                            person_number: null,
                            topic: null,
                            description: null,
                            event_id: null
                        };
                        return entity;
                    }]
                }
            })
            .state('report.detail', {
                params: {
                    id: null
                },
                views: {
                    'content@': {
                        templateUrl: 'report-detail.html',
                        controller: 'ReportDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'ReportService', function ($stateParams, ReportService) {
                        return ReportService.get($stateParams.id);
                    }]
                }
            })
            .state('report.edit', {
                params: {
                    id: null
                },
                views: {
                    'content@': {
                        templateUrl: 'report-addedit.html',
                        controller: 'ReportAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'ReportService', function ($stateParams, ReportService) {
                        return ReportService.get($stateParams.id);
                    }]
                }
            })
            .state('report.delete', {
                params: {
                    id: null
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'ReportService', function ($stateParams, $state, $mdDialog, ReportService) {
                    var confirm = $mdDialog.confirm()
                        .title('You delete this report?')
                        .textContent('This report and its details will be lost forever!')
                        .ariaLabel('Lucky day')
                        .ok('Yes')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        ReportService.del($stateParams.id).then(function () {
                            $state.go('report', null, {
                                reload: 'report'
                            });
                        });

                    }, function () {
                        $state.go('report');
                    });
                }]
            }).state('report.view', {
                views: {
                    'content@': {
                        templateUrl: 'report-view.html',
                        controller: 'ReportViewController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();