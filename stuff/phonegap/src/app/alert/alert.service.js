(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .provider('AlertService', AlertService);

    function AlertService() {
        /*jshint validthis: true */
        this.$get = getService;

        getService.$inject = ['$mdToast'];

        function getService($mdToast) {
            return {
                success: success,
                error: error,
                warning: warning
            };

            function success(msg) {
                var style = '';
                return show(msg, style);
            }

            function error(msg) {
                var style = 'm-toast-error';
                return show(msg, style);
            }

            function warning(msg) {
                var style = 'm-toast-warning';
                return show(msg, style);
            }


            function show(msg, style) {
                $mdToast.show({
                    hideDelay: 3000,
                    toastClass: style,
                    templateUrl: 'app/alert/alert.html',
                    controller: 'AlertController',
                    controllerAs: 'vm',
                    resolve: {
                        params: [function () {
                            return {
                                msg: msg
                            };
                        }]
                    }
                });
            }
        }
    }



})();