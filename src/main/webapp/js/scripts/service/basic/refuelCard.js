/**
 * Created by virgilyan on 4/13/15.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('RefuelCardService', RefuelCardService);
});
function RefuelCardService($http, data_host) {
    return {
        getById: function (id) {
            return $http.get(data_host + "/ctrl/refuelcard/search?type=2&id=" + id);
        },
        get: function () {
            return $http.get(data_host + "/ctrl/refuelcard/search?type=0");
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/refuelcard/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/refuelcard/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/refuelcard/remove?id=" + id);
        }
    }
}