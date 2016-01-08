/**
 * Created by sherry on 2015/12/7.
 */
define([
    'app', 'service/postService', 'service/pocketService'
], function (app) {
    app.controller('PostCtrl', PostCtrl);
});
function PostCtrl($scope, $rootScope, PostService, PocketService, $cookies) {
    $scope.postList = '';
    var page = 1;
    var size = 5;

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
    };

    var requestToken = $cookies.get("requestToken");
    $scope.addLinkToPocket = function (post) {
        //obtainRequestToken();
        var url = "http://localhost:8080/#/detail/" + post.id;
        if (requestToken) {
            addTo(requestToken, url, post.title);
        }
    };

    function obtainRequestToken() {
        PocketService.obtainRequestToken().success(function (data) {
            //console.log(data);
            var requestToken = data.substring(5, data.length);
            $cookies.put("requestToken", requestToken);
            console.log(requestToken);
            var redirectUri = "http://localhost:8080/#/";
            authorizeToken(requestToken, redirectUri);
        }).error(function (r) {
            console.log(r);
        });
    }

    function authorizeToken(requestToken, redirectUri) {
        window.location.href = "https://getpocket.com/auth/authorize?request_token=" + requestToken + "&redirect_uri=" + redirectUri;
    }

    function addTo(code, url, title) {
        PocketService.getAuthorizedToken(code).success(function (data) {
            //console.log(getQueryVariable('access_token',data));
            var accessToken = getQueryVariable('access_token', data);
            PocketService.addToPocket(accessToken, url, title).success(function (data) {
                alert("already add to pocket");
                console.log(data);
            }).error(function (r) {
                console.log(r);
            });
            console.log(data);
        }).error(function (r) {
            console.log(r);
            obtainRequestToken();
        });
    }

    function getQueryVariable(key, query) {
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == key) {
                return pair[1];
            }
        }
        alert('Query Variable ' + vars + ' not found');
    }
}