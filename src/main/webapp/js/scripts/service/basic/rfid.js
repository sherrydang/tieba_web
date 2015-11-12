define(['app'], function (app) {
    'use strict';
    app.factory('RfidService', RfidService);
});
function RfidService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/rfid/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/rfid/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/rfid/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/rfid/delete?id=" + id);
        }
    }
}