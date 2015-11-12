/**
 * Created by alexcai on 15/3/19.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('DistrictService', DistrictService);
});
function DistrictService($http, data_host) {
    return {
        getPrivate: function () {
            return $http.get(data_host + "/ctrl/district/getDistrictById?type=0");
        },
        getCity: function (pid) {
            return $http.get(data_host + "/ctrl/district/getDistrictById?type=1&pid=" + pid);
        },
        getArea: function (pid) {
            return $http.get(data_host + "/ctrl/district/getDistrictById?type=2&pid=" + pid);
        },
        getStreet: function (pid) {
            return $http.get(data_host + "/ctrl/district/getDistrictById?type=3&pid=" + pid);
        }
    }
}
