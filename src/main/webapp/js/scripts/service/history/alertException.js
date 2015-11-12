/**
 * Created by Beary on 2015/2/6.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('AlertExceptionService', AlertExceptionService);
});

function AlertExceptionService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/alertException?page=" + page + "&size=" + size);
        },
        unhandlerList: function () {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/alertException?page=0&size=9&status=0");
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/exceptionRecord/info/exceptionByKey?is_alert=1&page=' + page + '&size=' + size + '&' + params);
        },
        history: function (page, size, params) {
            return $http.get(data_host + "/ctrl/count/exportHistoryExcel?type=5&page=" + page + '&size=' + size + (params == null ? "" : ("&params=" + params)));
        }
    }
}