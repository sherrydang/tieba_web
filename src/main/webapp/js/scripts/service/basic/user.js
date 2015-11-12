define(['app'], function (app) {
    'use strict';
    app.factory('UserService', UserService);
});
function UserService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/user/search?type=1&page=" + page + "&size=" + size);
        },
        add: function (object) {
            return $http.post(data_host + "/ctrl/user/add", object);
        },
        update: function (object) {
            return $http.post(data_host + "/ctrl/user/update", object);
        },
        delete: function (id) {
            return $http.get(data_host + "/ctrl/user/delete?id=" + id);
        },
        updateRole: function (userId, object) {
            console.log(object);
            return $http.post(
                data_host + "/ctrl/user/updateRole",
                $.param({
                    userId: userId,
                    roles: JSON.stringify(object)
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
        },
        getRoleByUserId: function (userId) {
            return $http.get(data_host + "/ctrl/user/getRoleByUserId?userId=" + userId);
        },
        roles: function () {
            return $http.get(data_host + "/ctrl/role/roles");
        }
    }
}