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
            /*.when("/userDetail/:userId", angularAMD.route({
                templateUrl: 'views/user_details.html', controller: 'UserDetailsCtrl',
                controllerUrl: 'controller/userCtrl'
            }))*/
            .otherwise({
                redirectTo: '/'
            });
    });

    return angularAMD.bootstrap(app);
});