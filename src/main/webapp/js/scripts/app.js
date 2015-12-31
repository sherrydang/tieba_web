define(['angularAMD', 'angularRoute', 'ngGrid', 'filter/filter', 'angularSanitize','directive/directive'], function (angularAMD) {
    'use strict';
    var app = angular.module("ad", ['ngRoute','ngSanitize']);

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
            .when("/edit/:postId",angularAMD.route({
                templateUrl: 'views/postDetails.html', controller: 'PostDetailsCtrl',
                controllerUrl: 'controller/postDetailsCtrl'
            }))
            .when("/register",angularAMD.route({
                templateUrl: 'views/register.html', controller: 'RegisterCtrl',
                controllerUrl: 'controller/registerCtrl'
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
        return {
            getRole: function () {
                return $http.get(data_host + '/ctrl/client/role');
            }
        }
    }

    app.controller('RoleAuthCtrl',RoleAuthCtrl);
    function RoleAuthCtrl($scope,$rootScope, RoleAuthService){
        RoleAuthService.getRole().success(function(data){
            $rootScope.loginClient = data.client;
        }).error(function(r){
            console.log(r);
        });
        $scope.$on('$destroy',function(){
            $rootScope.loginClient = undefined;
        });
    }

    return angularAMD.bootstrap(app);
});