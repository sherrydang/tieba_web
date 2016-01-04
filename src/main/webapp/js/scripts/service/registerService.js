/**
 * Created by sherry on 2015/12/31.
 */
define(['app'], function (app) {
    app.factory('RegisterService', RegisterService);
});
function RegisterService($http, data_host) {
    return{
        addRegister: function (userObj) {
            return $http.post(data_host+'/register',
                $.param(userObj),
                {'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getRegisterById: function (id) {
            return $http.get(data_host+'/post/search?methodType=2&id='+id);
        }
    };
}