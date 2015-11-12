/**
 * Created by virgilyan on 4/13/15.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('AppUpdateService', AppUpdateService);
});
function AppUpdateService($http, data_host) {
    return {
        add: function (file, object) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(data_host + "/ctrl/setting/uploadNewVersion?type=" + object.type + "&version=" + object.version + "&detail=" + object.detail, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).progress(function (ev) {
                //progress
            }).success(function (data) {
                //success
            }).error(function (data) {
                //error
            });
        },
        list: function () {
            return $http.get(data_host + "/ctrl/setting/currentVersion");
        }
    }
}