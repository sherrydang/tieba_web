/**
 * Created by sherry on 2015/12/7.
 */
define([
    'app', 'service/userInfoService'
], function (app) {
    app.controller('UserInfoCtrl', UserInfoCtrl);
});
function UserInfoCtrl($scope, UserInfoService,$route) {
    $scope.userObj = '';
    $scope.clientId = $route.current.params.clientId;

    function getAllUserInfo(clientId){
        UserInfoService.getAllUserInfo(clientId).success(function(data){
            $scope.userObj = data.client;
        }).error(function(r){
            console.log(r);
        });
    }

    getAllUserInfo($scope.clientId);
}