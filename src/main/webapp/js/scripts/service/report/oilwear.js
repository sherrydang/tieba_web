define(['app', 'service/report/oilwear'], function (app) {
    'use strict';
    app.controller('OilWearCountCtrl', OilWearCountCtrl);
});
function OilWearCountCtrl($scope, OilWearCountService) {
    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100
            //b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: false
    });
    OilWearCountService.objects().success(function (data) {
        $scope.persons = data.persons;
        $scope.vehicles = data.vehicles;
        $scope.customs = data.customs;
        $scope.areas = data.areas;
        $scope.streets = data.streets;
    });

    var now = new Date();
    var start_time = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
    var end_time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();

    $scope.object = "";
    $scope.object = {time: "day",start_time:start_time,end_time:end_time};
    $scope.choose = function () {
        OilWearCountService.result($scope.object, $scope.time).success(function (data) {
            $scope.resultList = data.result.resultList;
            console.log($scope.resultList);
        });
    }
}