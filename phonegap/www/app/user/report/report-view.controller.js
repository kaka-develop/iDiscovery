(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportViewController', ReportViewController);

    ReportViewController.$inject = ['$scope', '$state', 'EventService', 'ReportService', '$cordovaSocialSharing', '$cordovaDevice'];

    function ReportViewController($scope, $state, EventService, ReportService, $cordovaSocialSharing, $cordovaDevice) {
        var vm = this;
        vm.events = [];
        vm.event_id = null;
        vm.report = null;
        vm.findReport = findReport;
        vm.share = share;

        vm.isBroswer = $cordovaDevice.getPlatform() == 'browser';

        loadAllEvents();

        function loadAllEvents() {
            EventService.all().then(function (value) {
                vm.events = value;
            });
        }


        function findReport() {
            ReportService.getByEventId(vm.event_id).then(function (value) {
                vm.report = value;
            });
        }

        function share() {
            if (vm.isBroswer)
                return;
            var subject = vm.topic;
            var message = vm.report.description;
            var file = "https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/77.png";
            var link = null;
            $cordovaSocialSharing
                .share(message, subject, file, link) // Share via native share sheet
                .then(function (result) {
                    console.log(result);
                }, function (err) {
                    console.log(err);
                });
        }



    }
})();