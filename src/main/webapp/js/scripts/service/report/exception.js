define(['app'], function (app) {
    'use strict';
    app.factory('ExceptionCountService', ExceptionCountService);
});
function ExceptionCountService($http, data_host) {
    return {
        objects: function () {
            return $http.get(data_host + "/ctrl/count/getExceptionBaseData");
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
            console.log("parm:start:" + start_time + ",end:" + end_time);
            return $http.get(data_host + "/ctrl/count/countException?" + (time != 'null' ? "time=" + time : ("start_time=" + start_time  + "&end_time=" + end_time)) + (driver != null ? "&person=" + driver : "") + (vehicle != null ? "&vehicle=" + vehicle : "") + (area != null ? "&area=" + area : "") + (street != null ? "&street=" + street : "") + "&page=" + (page != null ? page : 1) + "&size=20");
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

            //return $http.get(data_host + "/ctrl/count/exportCountExcel?time=" + (time != null ? time : "day") + (start_time != null ? "&start_time=" + start_time : "") + (end_time != null ? "&end_time=" + end_time : "") + (driver != null ? "&person_id=" + driver.id + "&person=" + driver.name : "") + (vehicle != null ? "&vehicle_id=" + vehicle.id + "&vehicle=" + vehicle.name : "") + (area != null ? "&area_id=" + area.id + "&area=" + area.name : "") + (street != null ? "&street_id=" + street.id + "&street=" + street.name : "") + "&type=3&page=1&size=0");
            return $http.get(data_host + "/ctrl/count/exportCountExcel?" + (time != null ? "time=" + time : (start_time != null ? "start_time=" + start_time : "") + (end_time != null ? "&end_time=" + end_time : "")) + (driver != null ? "&person_id=" + driver : "") + (vehicle != null ? "&vehicle_id=" + vehicle : "") + (area != null ? "&area_id=" + area : "") + (street != null ? "&street_id=" + street : "") + "&type=3&page=1&size=0");
        }
    }
}