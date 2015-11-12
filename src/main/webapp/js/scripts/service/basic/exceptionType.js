define(['app'], function (app) {
    'use strict';
    app.factory('ExceptionTypeService', ExceptionTypeService);
});
function ExceptionTypeService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/exceptionType/info/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/exceptionType/info/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/exceptionType/info/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/exceptionType/info/delete?id=" + id);
        },
        result: function (is_alert) {
            if (is_alert == 2) {
                return $http.get(data_host + "/ctrl/exceptionType/info/search?type=1&page=1&size=20");
            } else {
                return $http.get(data_host + "/ctrl/exceptionType/info/filterByParams?is_alert=" + is_alert + "&page=1&size=20");
            }
        }
    }
}