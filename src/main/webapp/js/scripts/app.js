define(['angularAMD', 'angularRoute', 'ngGrid', 'tree', 'angularUI', 'filter/filter', 'directive/directive', 'ngUploadFile'], function (angularAMD) {
    'use strict';
    var app = angular.module("recycle", ['ngRoute', 'ui.tree', 'ui', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.pagination', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning', 'ngFileUpload']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'views/map.html', controller: 'MapCtrl',
                controllerUrl: 'controller/basic/map'
            }))
            .when("/task", angularAMD.route({
                templateUrl: 'views/task/task.html', controller: 'TaskCtrl',
                controllerUrl: 'controller/basic/task'
            }))
            .when('/newTask', angularAMD.route({
                controller: 'TaskDetailCtrl',
                templateUrl: 'views/task/taskDetail.html', controllerUrl: 'controller/basic/task'
            }))
            .when('/taskDetail/:id/:state', angularAMD.route({
                controller: 'TaskDetailCtrl',
                templateUrl: 'views/task/taskDetail.html', controllerUrl: 'controller/basic/task'
            }))
            .when('/taskBind/:id/:state', angularAMD.route({
                controller: 'TaskBindCtrl',
                templateUrl: 'views/task/taskBind.html', controllerUrl: 'controller/basic/task'
            }))
            .when('/taskLog/:id', angularAMD.route({
                controller: 'TaskLogCtrl',
                templateUrl: 'views/task/taskLog.html', controllerUrl: 'controller/basic/task'
            }))
            .when('/taskPlan', angularAMD.route({
                controller: 'TaskPlanCtrl',
                templateUrl: 'views/task/taskPlan.html', controllerUrl: 'controller/basic/task'
            }))
            .when('/basic/user', angularAMD.route({
                controller: 'UserCtrl',
                templateUrl: 'views/basic/user.html', controllerUrl: 'controller/basic/user'
            }))
            .when("/basic/vehicle", angularAMD.route({
                controller: 'VehicleCtrl',
                templateUrl: 'views/basic/vehicle.html', controllerUrl: 'controller/basic/vehicle'
            }))
            .when("/basic/vehicleDetail/:id", angularAMD.route({
                controller: 'VehicleDetailCtrl',
                templateUrl: 'views/basic/vehicleDetail.html', controllerUrl: 'controller/basic/vehicle'
            }))
            .when("/basic/operatesTree", angularAMD.route({
                controller: 'OperatesTreeCtrl',
                templateUrl: 'views/basic/operatesTree.html', controllerUrl: 'controller/basic/OperatesTreeCtrl'
            }))
            .when("/basic/role", angularAMD.route({
                controller: 'RoleCtrl',
                templateUrl: 'views/basic/role.html', controllerUrl: 'controller/basic/role'
            }))
            .when("/basic/refuelCard", angularAMD.route({
                controller: 'RefuelCardCtrl',
                templateUrl: 'views/basic/refuelCard.html', controllerUrl: 'controller/basic/refuelCard'
            }))
            .when("/basic/user_rfid", angularAMD.route({
                controller: 'UserRfidCtrl',
                templateUrl: 'views/basic/user_rfid.html', controllerUrl: 'controller/basic/user_rfid'
            }))
            .when("/basic/garbage_rfid", angularAMD.route({
                controller: 'GarbageRfidCtrl',
                templateUrl: 'views/basic/garbage_rfid.html', controllerUrl: 'controller/basic/garbage_rfid'
            }))
            .when("/basic/vehicle_rfid", angularAMD.route({
                controller: 'VehicleRfidCtrl',
                templateUrl: 'views/basic/vehicle_rfid.html', controllerUrl: 'controller/basic/vehicle_rfid'
            }))
            .when("/basic/exceptionType", angularAMD.route({
                controller: 'ExceptionTypeCtrl',
                templateUrl: 'views/basic/exceptionType.html', controllerUrl: 'controller/basic/exceptionType'
            }))
            .when("/history/plan", angularAMD.route({
                controller: 'PlanCtrl',
                templateUrl: 'views/history/plan.html', controllerUrl: 'controller/history/collection'
            }))
            .when("/basic/customer", angularAMD.route({
                controller: 'CustomerCtrl',
                templateUrl: 'views/basic/customer.html', controllerUrl: 'controller/basic/customer'
            }))
            .when("/basic/customerGarbage/:id/:date", angularAMD.route({
                controller: 'CustomerGarbageCtrl',
                templateUrl: 'views/basic/customerGarbage.html', controllerUrl: 'controller/basic/customer'
            }))
            .when("/report/garbage", angularAMD.route({
                controller: 'GarbageCountCtrl',
                templateUrl: 'views/report/garbage.html', controllerUrl: 'controller/report/garbage'
            }))
            //.when("/report/oilwear", angularAMD.route({
            //    controller: 'OilWearCountCtrl',
            //    templateUrl: 'views/report/oilwear.html', controllerUrl: 'controller/report/oilwear'
            //}))
            .when("/report/refuel", angularAMD.route({
                controller: 'RefuelCountCtrl',
                templateUrl: 'views/report/refuel.html', controllerUrl: 'controller/report/refuel'
            }))
            .when("/report/recharge", angularAMD.route({
                controller: 'RechargeCountCtrl',
                templateUrl: 'views/report/recharge.html', controllerUrl: 'controller/report/recharge'
            }))
            .when("/report/exception", angularAMD.route({
                controller: 'ExceptionCountCtrl',
                templateUrl: 'views/report/exception.html', controllerUrl: 'controller/report/exception'
            }))
            .when("/history/recycleHistory", angularAMD.route({
                controller: 'RecycleHistoryCtrl',
                templateUrl: 'views/history/recycleHistory.html', controllerUrl: 'controller/history/recycleHistory'
            }))
            .when("/history/alertException", angularAMD.route({
                controller: 'AlertExceptionCtrl',
                templateUrl: 'views/history/alertexception.html', controllerUrl: 'controller/history/alertException'
            }))
            .when("/history/monitoringMap/:id/:date", angularAMD.route({
                controller: 'MonitoringMapCtrl',
                templateUrl: 'views/history/monitoringMap.html', controllerUrl: 'controller/history/monitoring'
            }))
            .when("/history/exceptionRecord", angularAMD.route({
                controller: 'ExceptionRecordCtrl',
                templateUrl: 'views/history/exceptionRecord.html',
                controllerUrl: 'controller/history/exceptionRecord'
            }))
            .when("/setting/app_update", angularAMD.route({
                controller: 'AppUpdateCtrl',
                templateUrl: 'views/setting/app_update.html',
                controllerUrl: 'controller/setting/app_update'
            }))
            .when("/setting/timer", angularAMD.route({
                controller: 'TimerCtrl',
                templateUrl: 'views/setting/timer.html',
                controllerUrl: 'controller/setting/timer'
            }))
            .when("/errorPage/:code/:message", angularAMD.route({
                controller: 'ErrorPageCtrl',
                templateUrl: 'views/errorPage.html',
                controllerUrl: 'controller/basic/error'
            }))

    });


    //app.value("data_host", "http://cms.geetion.com/web");
    app.value("data_host", "http://localhost:8080/web");
    app.value("map_host", "http://geetion.wicp.net:50094");
    //app.value("map_host", "http://192.168.1.199:3003");
    app.value("route_host", "http://geetion.wicp.net:58447");
    //app.value("route_host", "http://192.168.1.199:8989");


    //实现即时通知
    app.controller('NotificationCtrl', NotificationCtrl);
    app.factory('NotificationExceptionService', NotificationExceptionService);
    app.factory('NotificationRecordService', NotificationRecordService);

    app.factory('timestampMarker', [function () {
        var timestampMarker = {
            response: function (response) {
                if ("data" in response) {
                    if (response.data.code == 406) {
                        //console.log(response.data.message);
                        location.href = 'index.html#/errorPage/' + response.data.code + '/' + response.data.message + '';
                        return "{data:{}}"
                    } else {
                        return response;
                    }
                }
            }
        };
        return timestampMarker;
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('timestampMarker');
    }]);

    return angularAMD.bootstrap(app);
});


function NotificationExceptionService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/alertException?page=" + page + "&size=" + size);
        },
        unhandlerList: function () {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/alertException?page=0&size=9&status=0");
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/exceptionRecord/info/exceptionByKey?is_alert=1&page=' + page + '&size=' + size + '&' + params);
        }
    }
}

function NotificationRecordService($http, data_host) {
    return {
        list: function (page, size) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/exception?page=" + page + "&size=" + size);
        },
        getId: function (exception_id) {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/search?type=2&id=" + exception_id);
        },
        unhandlerList: function () {
            return $http.get(data_host + "/ctrl/exceptionRecord/info/exception?page=0&size=9&status=0");
        },
        keysearch: function (page, size, params) {
            return $http.get(data_host + '/ctrl/exceptionRecord/info/exceptionByKey?is_alert=0&page=' + page + '&size=' + size + '&' + params);
        },
        host: function () {
            return data_host;
        }
    }
}

function NotificationCtrl($scope, $interval, $location, NotificationRecordService, NotificationExceptionService) {

    NotificationExceptionService.unhandlerList().success(function (data) {
        $scope.alertList = data.list;
        for (var i = 0; i < $scope.alertList.length; i++) {
            var item = $scope.alertList[i];
            item.showtime = GetTodayDiff(item.create_time);
        }
    });
    NotificationRecordService.unhandlerList().success(function (data) {
        $scope.exceptionList = data.list;
        for (var i = 0; i < $scope.exceptionList.length; i++) {
            var item = $scope.exceptionList[i];
            item.showtime = GetTodayDiff(item.create_time);
        }
    });
    $scope.$on('$destroy', function () {
        $interval.cancel(autoPushTime);
    })
    /**
     * 计算时间 1 分钟重新计算过所有警报，异常的时间
     */
    var autoPushTime = $interval(function () {
        if ($scope.exceptionList != undefined) {
            for (var i = 0; i < $scope.exceptionList.length; i++) {
                $scope.exceptionList[i].showtime = GetTodayDiff($scope.exceptionList[i].create_time);
            }
        }
        if ($scope.alertList != undefined) {
            for (var i = 0; i < $scope.alertList.length; i++) {
                $scope.alertList[i].showtime = GetTodayDiff($scope.alertList[i].create_time);
            }
        }
    }, 60 * 1000);

    var onMessageArrived = function (message) {
        if (message.destinationName == 'exceptionTopic') {
            console.log(message.payloadString);
            var data = new String(message.payloadString);
            var json = JSON.parse(data);
            NotificationRecordService.getId(json.exception_id).success(function (data) {
                console.log(data.object);
                var exception = data.object;
                exception.is_alert = exception.exceptionType.is_alert;
                exception.name = exception.exceptionType.name;
                exception.plate_number = exception.collection.vehicle.plate_number;
                exception.showtime = GetTodayDiff(exception.create_time);
                if (exception.is_alert == 1) {
                    $scope.alertList.unshift(exception);
                } else {
                    $scope.exceptionList.unshift(exception);
                }
            });
        }
    }

    /**
     * 初始化 webSocket
     */
    var supported = ("WebSocket" in window);
    if (!supported) {
        var msg = "Your browser does not support Web Sockets. This example will not work properly.<br>";
        msg += "Please use a Web Browser with Web Sockets support (WebKit or Google Chrome).";
        console.error(msg);
    } else {
        initConnect(onMessageArrived);
    }


    function GetTodayDiff(startTime) {
        var sTime = new Date(startTime); //开始时间
        var eTime = new Date(); //结束时间
        //作为除数的数字
        var divNum;
        var second, minutes, hour, day;

        divNum = 1000;
        second = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
        if (second > 180) {
            divNum = 1000 * 60;
            minutes = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
            if (minutes > 60) {
                divNum = 1000 * 3600;
                hour = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
                if (hour > 24) {
                    divNum = 1000 * 3600 * 24;
                    day = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
                    return day + "天前";
                } else {
                    return hour + "小时前";
                }
            } else {
                return minutes + "分钟前";
            }
        } else {
            return "刚刚";
        }
    }
}