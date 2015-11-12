define(['app'], function (app) {
    'use strict';
    app.factory('MonitoringService', MonitoringService);
});

function MonitoringService($http, data_host) {
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/vehicle/searchBox?type=0");
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/recycleGarbageRecord/info/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/recycleGarbageRecord/info/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/recycleGarbageRecord/info/delete?id=" + id);
        },
        listBox: function (client_id, dateTime) {
            return $http.get(data_host + "/ctrl/boxContent/searchBoxContent?client_id=" + client_id + "&time=" + dateTime);
        },
        monitorRecord:function(date, vehicle_id){
            return $http.get(data_host + "/ctrl/monitorRecord/getByInfo?date=" + date.substring(0,11) + "&vehicle_id=" + vehicle_id + "&size=0");
        }
    }
}