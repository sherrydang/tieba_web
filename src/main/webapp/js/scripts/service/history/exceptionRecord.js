/**
 * Created by Beary on 2015/2/5.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('ExceptionRecordService', ExceptionRecordService);
});

function ExceptionRecordService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/exception?page=" + page + "&size=" + size);
        },
        getId: function (exception_id) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/search?type=2&id=" + exception_id);
        },
        unhandlerList: function () {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/exception?page=0&size=9&status=0");
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/exceptionRecord/info/exceptionByKey?is_alert=0&page=' + page + '&size=' + size + '&' + params);
        },
        host: function () {
            return data_host;
        },
        image: function (id) {
            return $http.get(data_host + '/ctrl/exceptionRecord/info/image?id=' + id);
        },
        history: function (page, size, params) {
            return $http.get(data_host + "/ctrl/count/exportHistoryExcel?&type=6&page=" + page + "&size=" + size + (params == null ? "" : ("&params=" + params)));
        }
    }

}

