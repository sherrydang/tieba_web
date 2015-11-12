define(['app'], function (app) {
    'use strict';
    app.factory('RefuelCountService', RefuelCountService);
});

function RefuelCountService($http, data_host) {
    return {
        objects: function () {
            return $http.get(data_host + "/ctrl/count/getVehicleRefuel");
        },
        result: function (object, page) {
            var driver = object.person;
            var vehicle = object.vehicle;
            var area = object.area;
            var street = object.street;
            var time = object.time;
            var start_time = object.start_time;
            var end_time = object.end_time;
            var page = page;
            return $http.get(data_host + "/ctrl/count/countRefuel?" + (time != 'null' ? "time=" + time : ("start_time=" + start_time  + "&end_time=" + end_time)) + (driver != null ? "&person=" + driver : "") + (vehicle != null ? "&vehicle=" + vehicle : "") + (area != null ? "&area=" + area : "") + (street != null ? "&street=" + street : "") + "&page=" + (page != null ? page : 1) + "&size=20");
        },
        report: function (object) {
            console.log("report--------------------->");
            var driver = object.person;
            var vehicle = object.vehicle;
            var area = object.area;
            var street = object.street;
            var start_time = object.start_time;
            var end_time = object.end_time;
            var time = object.time;

            return $http.get(data_host + "/ctrl/count/exportCountExcel?" + (time != 'null' ? "time=" + time : ("start_time=" + start_time  + "&end_time=" + end_time)) + (driver != null ? "&person_id=" + driver : "") + (vehicle != null ? "&vehicle_id=" + vehicle : "") + (area != null ? "&area_id=" + area : "") + (street != null ? "&street_id=" + street : "") + "&type=1&page=1&size=0");
        }
    }
}