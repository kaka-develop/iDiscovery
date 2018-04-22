(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$state', 'entity', '$cordovaSocialSharing'];

    function ReportDetailController($scope, $state, entity, $cordovaSocialSharing) {
        var vm = this;
        vm.report = entity;
        vm.share = share;

        function share() {
            var subject = vm.topic;
            var message = vm.report.description; 
            $cordovaSocialSharing
                .share(message, subject, null, null) // Share via native share sheet
                .then(function (result) {
                    console.log(result);
                }, function (err) {
                    console.log(err);
                });
        }



    }
})();