/**
 * Created by alexcai on 15/3/19.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('GasStationService', GasStationService);
});

function GasStationService($http, data_host) {
    return {
        list: function () {
            return $http.get(data_host + "/ctrl/gasstation/search?type=0");
        }
    }
}