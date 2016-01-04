/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('UserInfoService', UserInfoService);
});
function UserInfoService($http, data_host) {
    return{
        getAllUserInfo: function(id){
            return $http.get(data_host+'/info/getInfo?clientId='+id);
        }
    };
}