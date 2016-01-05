/**
 * Created by sherry on 2015/12/7.
 */
define([
    'app', 'service/postService'
], function (app) {
    app.controller('PostCtrl', PostCtrl);
});
function PostCtrl($scope, $rootScope, PostService) {
    $scope.postList = '';
    var page = 1;
    var size = 5;

    /*function getAllPost(){
     PostService.getAllPost().success(function(data){
     $scope.postList = data.data.children;
     console.log($scope.postList);
     }).error(function(r){
     console.log(r);
     });
     }*/

    //getAllPost();

    function getAllPost() {
        PostService.getAllPost().success(function (data) {
            $scope.postList = data.list;
        }).error(function (r) {
            console.log(r);
        });
    }

    getAllPost();

    $rootScope.getPostByParams = function () {
        PostService.getPostByParams(page, size, $rootScope.sTitle).success(function (data) {
            $scope.postList = data.list;
        }).error(function (r) {
            console.log(r);
        });
    }
}