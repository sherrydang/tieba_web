/**
 * Created by sherry on 2015/12/7.
 */
define([
    'app', 'service/postService'
], function (app) {
    app.controller('PostCtrl', PostCtrl);
});
function PostCtrl($scope, PostService) {
    $scope.postList = '';


    function getAllPost(){
        PostService.getAllPost().success(function(data){
            $scope.postList = data.data.children;
            console.log($scope.postList);
        }).error(function(r){
            console.log(r);
        });
    }

    getAllPost();
}