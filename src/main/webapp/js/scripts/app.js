define(['angularAMD', 'angularRoute', 'filter/filter', 'angularSanitize','directive/directive','ngUploadFile','angularCookies'], function (angularAMD) {
    'use strict';
    var app = angular.module("tieba", ['ngRoute','ngSanitize','ngFileUpload','ngCookies']);

    app.value("data_host", "http://localhost:8080/");

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'views/postList.html'
                , controller: 'PostCtrl',
                controllerUrl: 'controller/postCtrl'
            }))
            .when("/edit", angularAMD.route({
                templateUrl: 'views/editPost.html'
                , controller: 'EditPostCtrl',
                controllerUrl: 'controller/editPostsCtrl'
            }))
            .when("/detail/:postId",angularAMD.route({
                templateUrl: 'views/postDetails.html', controller: 'PostDetailsCtrl',
                controllerUrl: 'controller/postDetailsCtrl'
            }))
            .when("/register",angularAMD.route({
                templateUrl: 'views/register.html', controller: 'RegisterCtrl',
                controllerUrl: 'controller/registerCtrl'
            }))
            .when("/userInfo/:clientId",angularAMD.route({
                templateUrl: 'views/userInfo.html', controller: 'UserInfoCtrl',
                controllerUrl: 'controller/userInfoCtrl'
            }))
            /*.when("/userDetail/:userId", angularAMD.route({
                templateUrl: 'views/user_details.html', controller: 'UserDetailsCtrl',
                controllerUrl: 'controller/userCtrl'
            }))*/
            .otherwise({
                redirectTo: '/'
            });
    });

    app.factory('RoleAuthService',RoleAuthService);
    function RoleAuthService($http, data_host){

        var userRole = ["GUEST"];
        var userRoleRouteMap = {
            'USER': ['/','/edit','/detail/:postId','/register','/userInfo'],
            'GUEST': ['/','/detail/:postId','/register','/userInfo']
        };

        return {
            getRole: function () {
                return $http.get(data_host + '/role');
            },
            isUrlAccessible: function (route) {
                for (var i = 0; i < userRole.length; i++) {
                    var role = userRole[i];
                    var validUrlsForRole = userRoleRouteMap[role];
                    if (validUrlsForRole) {
                        for (var j = 0; j < validUrlsForRole.length; j++) {
                            if (validUrlsForRole[j] == route)
                                return true;
                        }
                    }
                }
                return false;
            },

            setRoles: function(arr){
                if(userRole.length > 0){
                    userRole = userRole.concat(arr);
                }else{
                    userRole = arr;
                }
                return this;
            },

            getRoles: function(){
                return userRole;
            }
        }
    }

    app.controller('RoleAuthCtrl',RoleAuthCtrl);
    function RoleAuthCtrl($scope,$rootScope, RoleAuthService, $location, data_host){
        RoleAuthService.getRole().success(function(data){
            if(data.code==200){
                $rootScope.loginClient = data.client;
                $rootScope.isLogging = true;
                RoleAuthService.setRoles(["USER"]);
            }
        }).error(function(r){
            //console.log(r);
        });
        $scope.$on('$destroy',function(){
            $rootScope.loginClient = undefined;
        });
        $scope.$watch('spostTitle', function (newVal, oldVal) {
            if(newVal !== '' && newVal !== oldVal){
                $rootScope.sTitle = $scope.spostTitle;
            }
        });
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            //console.log($location.absUrl());
            if($location.absUrl()!==data_host+'/#/'&&$location.absUrl()!==data_host&&!RoleAuthService.isUrlAccessible(next.originalPath)){
                $("#login-user").modal("show");
                if(current === undefined){
                    $location.path("/");
                } else{
                    event.preventDefault();
                }
            }
        });
    }

    return angularAMD.bootstrap(app);
});