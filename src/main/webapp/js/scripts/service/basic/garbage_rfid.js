define(['app'], function (app) {
    'use strict';
    app.factory('GarbageRfidService', GarbageRfidService);
});
function GarbageRfidService($http, data_host) {
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/rfid/searchGarbage");
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