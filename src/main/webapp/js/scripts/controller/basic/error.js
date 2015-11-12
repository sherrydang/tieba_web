define(['app'], function (app) {
    'use strict';
    app.controller('ErrorPageCtrl', ErrorPageCtrl);
});

function  ErrorPageCtrl($scope, $route, $location){
    if($route.current.params.code){
        $scope.code = $route.current.params.code;
    }
    if($route.current.params.message){
        $scope.message = $route.current.params.message;
    }
}