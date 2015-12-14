define(['angularAMD', 'angularRoute', 'ngGrid', 'angularUI', 'filter/filter', 'directive/directive'], function (angularAMD) {
    'use strict';
    var app = angular.module("ad", ['ngRoute', 'ui', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.pagination', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning']);

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