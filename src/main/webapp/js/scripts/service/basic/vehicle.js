define(['app'], function (app) {
    'use strict';
    app.factory('VehicleService', VehicleService);
});

function VehicleService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/vehicle/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/vehicle/delete?id=" + id);
        },
        listMaintenance: function (vehicleId, page, size) {
            return $http.get(data_host + "/ctrl/vehicle/maintenance/search?type=1&vehicleId=" + vehicleId + "&page=" + page + "&size=" + size);
        },
        addMaintenance: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/maintenance/add", object);
        },
        updateMaintenance: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/maintenance/update", object);
        },
        deleteMaintenance: function (id) {
            return $http.get(data_host + "/ctrl/vehicle/maintenance/delete?id=" + id);
        },
        listInsurance: function (vehicleId, page, size) {
            return $http.get(data_host + "/ctrl/vehicle/insurance/search?type=1&vehicleId=" + vehicleId + "&page=" + page + "&size=" + size);
        },
        addInsurance: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/insurance/add", object);
        },
        updateInsurance: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/insurance/update", object);
        },
        deleteInsurance: function (id) {
            return $http.get(data_host + "/ctrl/vehicle/insurance/delete?id=" + id);
        },
        listAnnualTicket: function (vehicleId, page, size) {
            return $http.get(data_host + "/ctrl/vehicle/annualticket/search?type=1&vehicleId=" + vehicleId + "&page=" + page + "&size=" + size);
        },
        addAnnualTicket: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/annualticket/add", object);
        },
        updateAnnualTicket: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/annualticket/update", object);
        },
        deleteAnnualTicket: function (id) {
            return $http.get(data_host + "/ctrl/vehicle/annualticket/delete?id=" + id);
        },
        listAnnualVerification: function (vehicleId, page, size) {
            return $http.get(data_host + "/ctrl/vehicle/annualverification/search?type=1&vehicleId=" + vehicleId + "&page=" + page + "&size=" + size);
        },
        addAnnualVerification: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/annualverification/add", object);
        },
        updateAnnualVerification: function (object) {
            return $http.post(data_host + "/ctrl/vehicle/annualverification/update", object);
        },
        deleteAnnualVerification: function (id) {
            return $http.get(data_host + "/ctrl/vehicle/annualverification/delete?id=" + id);
        }
    }
}