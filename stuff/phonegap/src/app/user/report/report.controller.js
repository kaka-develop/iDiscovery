(function () {
    'use strict';

    angular
        .module('iDiscoveryApp')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$state', 'ReportService'];

    function ReportController($scope, $state, ReportService) {
        var vm = this;

        vm.field = 'topic';
        vm.text = '';
        vm.reports = [];
        vm.search = search;
        vm.fields = [{
                title: 'Person Number',
                value: 'person_number'
            },
            {
                title: 'Topic',
                value: 'topic'
            },
            {
                title: 'Description',
                value: 'description'
            }
        ];


        search();

        function search() {
            ReportService.search(vm.field, vm.text).then(function (value) {
                vm.reports = value;
            });
        }

       
    }
})();