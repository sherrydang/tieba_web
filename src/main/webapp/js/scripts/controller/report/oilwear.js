define(['app'], function (app) {
    'use strict';
    app.factory('OilWearCountService', OilWearCountService);
});
function OilWearCountService($http, data_host) {
    return {
        objects: function () {
            return $http.get(data_host + "/ctrl/count/getGarbageCountObject");
        },
        result: function (search, time, page) {
            var search_object = search.split(",")
            return $http.get(data_host + "/ctrl/count/countGarbageCollectionAmount?type=" + (search_object[0] != null ? search_object[0] : 0) + (search_object[1] != null && search_object[1] != -1 ? "&object_id=" + search_object[1] : "") + "&time=" + (time != null ? time : "day") + "&page=" + (page != null ? page : 1) + "&size=20");
        }
    }
}