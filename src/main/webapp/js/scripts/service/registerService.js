/**
 * Created by sherry on 2015/12/31.
 */
define(['app'], function (app) {
    app.factory('RegisterService', RegisterService);
});
function RegisterService($http, data_host) {
    return{
        getAllRegister: function(){
            //return $http.get('https://www.reddit.com/r/Android/new/.json');
            return $http.get(data_host+'/ctrl/post/search?methodType=1');
        },
        addRegister: function (postObj) {
            return $http.post(data_host+'/ctrl/post/add',
                $.param(postObj),
                {'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getRegisterById: function (id) {
            return $http.get(data_host+'/ctrl/post/search?methodType=2&id='+id);
        }
    };
}