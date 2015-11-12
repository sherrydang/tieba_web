/**
 * Created by Beary on 2015/2/5.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('CollectionService', CollectionService);
});

function CollectionService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/collection/collectionByKey?page=" + page + "&size=" + size);
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/collection/collectionByKey?page=' + page + '&size=' + size + '&' + params);
        }
    }
}