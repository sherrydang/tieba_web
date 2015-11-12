define(['app'], function (app) {
    'use strict';
    app.factory('RecycleHistoryService', RecycleHistoryService);
});

function RecycleHistoryService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/recycleGarbageRecord/info/recycleByKey?page=" + page + "&size=" + size);
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
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/recycleGarbageRecord/info/recycleByKey?page=' + page + '&size=' + size + '&' + params);
        },
        history: function (page, size, params) {
            return $http.get(data_host + "/ctrl/count/exportHistoryExcel?type=4" + '&page=' + page + '&size=' + size + (params == null ? "" : ("&params=" + params)));
        }
    }
}