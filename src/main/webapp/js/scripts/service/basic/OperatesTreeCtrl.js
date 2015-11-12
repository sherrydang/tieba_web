/**
 * Created by Beary on 2015/2/12.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('OperatesTreeService', OperatesTreeService);
});

function OperatesTreeService($http, data_host) {
    return {
        treelist: function () {
            return $http.get(data_host + "/ctrl/operate/getLevOp");
        },
        addSubItem: function (object) {
            return $http.post(data_host + "/ctrl/operate/add", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/operate/delete?id=" + id);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/operate/update", object);
        }
    }
}