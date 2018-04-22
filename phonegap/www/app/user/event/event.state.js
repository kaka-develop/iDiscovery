(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];


    function stateConfig($stateProvider) {
        $stateProvider
            .state('event', {
                parent: 'user',
                views: {
                    'content@': {
                        templateUrl: 'events.html',
                        controller: 'EventController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('event.new', {
                views: {
                    'content@': {
                        templateUrl: 'event-addedit.html',
                        controller: 'EventAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: [function () {
                        var entity = {
                            id: null,
                            activity_name: null,
                            reporter_name: null,
                            activity_location: null,
                            attending_time: new Date(),
                            activity_date: new Date()
                        };
                        return entity;
                    }]
                }
            })
            .state('event.detail', {
                params: {
                    id: null
                },
                views: {
                    'content@': {
                        templateUrl: 'event-detail.html',
                        controller: 'EventDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'EventService', function ($stateParams, EventService) {
                        return EventService.get($stateParams.id);
                    }]
                }
            })
            .state('event.edit', {
                params: {
                    id: null
                },
                views: {
                    'content@': {
                        templateUrl: 'event-addedit.html',
                        controller: 'EventAddEditController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'EventService', function ($stateParams, EventService) {
                        return EventService.get($stateParams.id);
                    }]
                }
            })
            .state('event.delete', {
                params: {
                    id: null
                },
                onEnter: ['$stateParams', '$state', '$mdDialog', 'EventService', 'ReportService', 'AlertService', function ($stateParams, $state, $mdDialog, EventService, ReportService, AlertService) {
                    ReportService.isEventExisted($stateParams.id).then(function (value) {
                        if (value) {
                            AlertService.error("Event has the report!");
                            return;
                        } else {
                            var confirm = $mdDialog.confirm()
                                .title('You delete this event?')
                                .textContent('This event and its details will be lost forever!')
                                .ariaLabel('Lucky day')
                                .ok('Yes')
                                .cancel('Cancel');

                            $mdDialog.show(confirm).then(function () {
                                EventService.del($stateParams.id).then(function () {
                                    $state.go('event', null, {
                                        reload: 'event'
                                    });
                                });

                            }, function () {
                                $state.go('event');
                            });
                        }
                    });


                }]
            });
    }
})();