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


    /*function getAllPost(){
        PostService.getAllPost().success(function(data){
            $scope.postList = data.data.children;
            console.log($scope.postList);
        }).error(function(r){
            console.log(r);
        });
    }*/

    //getAllPost();

    function getAllPost(){
        PostService.getAllPost().success(function(data){
            $scope.postList = data.list;
        }).error(function(r){
            console.log(r);
        });
    }

    getAllPost();

    function showTemplate(){
        var apiName = "searchPublicComment ";
        var paramList = [];
        var params = "";
        for(var x = 0; x < paramList.length-1; x++){
            params += paramList[x]+", ";
        }
        params += paramList[paramList.length-1];
        var str;
        str = apiName+": function ("+params+") {"
            +"return $http.get(data_host + '/ctrl/project/"+apiName+"?"+paramList[0]+"='+"+paramList[0]+"+";
        for(var x = 1; x < paramList.length-1; x++){
            str += "'&"+paramList[x]+"='+"+paramList[x]+"+";
        }
        str += "'&"+paramList[paramList.length-1]+"='+"+paramList[paramList.length-1];
        str += ");},";
        $scope.template = str;
    }

    /*searchPublicCommentById: function (id) {
        return $http.get(data_host + '/ctrl/project/searchPublicComment?methodType=2&id='+id);
    },*/

    function idshowTemplate(){
        var apiName = "searchPublicComment";
        var url = "";
        var str;
        str = apiName+": function () {"
            +"return $http.get(data_host + '"+url+"?methodType=2&id='+id);},";
        $scope.template = str;
    }

    idshowTemplate();
}