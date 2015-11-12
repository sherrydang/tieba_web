define(['app'], function (app) {
    'use strict';
    app.factory('CustomerService', CustomerService);
    app.factory('CustomerGarbageService', CustomerGarbageService);
});

function CustomerService($http, data_host) {
    return {
        findbyId: function (id) {
            return $http.get(data_host + "/ctrl/customer/info/search?type=2&id=" + id);
        },
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/customer/info/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/customer/info/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/customer/info/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/customer/info/delete?id=" + id);
        },
        host: function () {
            return data_host;
        },
        image: function (id) {
            return $http.get(data_host + "/ctrl/customer/info/image?customId=" + id);
        },
        collectTask: function (taskObject) {
            return $http.post(data_host + "/ctrl/customer/info/collectTask", taskObject);
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + "/ctrl/customer/info/search?type=3&page=" + page + "&size=" + size + (params != null ? params : ""));
        }
    }
}

function CustomerGarbageService($http, data_host) {
    return {
        GarbageList: function (custom_id, page, size) {
            return $http.get(data_host + "/ctrl/ReceiveGarbageRecord/info/getReceiveGarbageRecordsByCustomId?custom_id=" + custom_id + "&page=" + page + "&size=" + size);
        }
    }
}