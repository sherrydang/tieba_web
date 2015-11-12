/**
 * Created by alexcai on 15/3/18.
 */
define(['../../app'], function (app) {
    app.factory('AlertExceptionService', AlertExceptionService);
    app.factory('ExceptionRecordService', ExceptionRecordService);
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
        }
    }
}
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
        }
    }
}