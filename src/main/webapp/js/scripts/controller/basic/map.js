define(['app', 'service/basic/task', 'service/basic/gasstation'], function (app) {
    'use strict';
    app.controller('MapCtrl', MapCtrl);
});
function MapCtrl($scope, $interval, map_host, route_host, TaskService, GasStationService, $timeout) {
    var move;
    $scope.$on('$destroy', function () {
        $timeout.cancel(move);
    });
    $scope.vehicle = {taskList: []};
    $scope.vehicleList = [];
    var markers = new Array();

    $scope.vehicleOptions = {
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        enableSelectAll: false,
        columnDefs: [
            {name: '车牌号', field: 'plate_number', width: 150},
            {name: '驾驶人', field: 'personalBase.name', width: 150}
        ],
        onRegisterApi: function (gridApi) {
            $scope.vehicleGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.vehicle = row.entity;
                if ($scope.vehicle != undefined) {
                    $scope.taskOptions.data = $scope.vehicle.taskList;
                    showRecyle();
                } else {
                    removeRecyle();
                }
                if ($scope.vehicle.lat != undefined && $scope.vehicle.lng != undefined)
                    map.panTo([$scope.vehicle.lat, $scope.vehicle.lng], 13);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        }
    }

    $scope.taskOptions = {
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        enableSelectAll: false,
        columnDefs: [
            {name: '名字', field: 'taskObject.custom.name', width: 150},
            {name: '地址', field: 'taskObject.custom.address', width: 150},
            {name: '开始时间', field: 'taskObject.start_time', width: 150},
            {name: '结束时间', field: 'taskObject.end_time', width: 150}
        ],
        onRegisterApi: function (gridApi) {
            $scope.taskGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.entity.taskObject.custom.lat != undefined && row.entity.taskObject.custom.lng != undefined)
                    map.panTo(new L.LatLng(row.entity.taskObject.custom.lat, row.entity.taskObject.custom.lng), 13);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });

            TaskService.tasks().success(function (data) {
                $scope.vehicleList = data.taskVehicles;
                $scope.vehicleOptions.data = $scope.vehicleList;
                vehicleMove();
            });

            $scope.$on('$destroy', function () {
                $interval.cancel(autoPushTime);
            })
            /**
             * 计算时间 0.5 分钟重新获取当前参与方案的车辆和任务的状态
             */
            var autoPushTime = $interval(function () {
                TaskService.tasks().success(function (data) {
                    $scope.vehicleList = data.taskVehicles;
                    $scope.vehicleOptions.data = $scope.vehicleList;
                    vehicleMove();
                });
            }, 30 * 1000);
        }
    }

    GasStationService.list().success(function (data) {
        $scope.gasList = data.list;
        $scope.$watch('gasStation', function () {
            if ($scope.gasStation) {
                showGasStation();
            } else {
                removeStation();
            }
        });
    });

    function showGasStation() {
        for (var i = 0; i < $scope.gasList.length; i++) {
            var gas = $scope.gasList[i];
            var lat = gas.lat;
            var lng = gas.lng;
            var icon = new L.Icon({
                iconSize: [37.3, 56.6],
                iconAnchor: [22, 48],
                iconUrl: 'img/icon2/icon_gasstation.png'
            });
            var marker = L.marker([lat, lng], {
                icon: icon,
                alt: "gas"
            });
            var s = "<b>" + gas.name + "</b><li>" + gas.address + "</li>";
            marker.bindPopup(s).openPopup();
            marker.on('click', function () {
            });
            map.addLayer(marker);
        }
    }

    function removeStation() {
        map.eachLayer(function (m) {
            if (m.options.alt == "gas")
                map.removeLayer(m);
        });
    }

    /**
     * 垃圾车移动
     **/
    function vehicleMove() {
        TaskService.getGpsByVehicle($scope.vehicleList).success(function (json) {
                if (json.result == undefined)
                    return;
                for (var i = 0; i < json.result.length; i++) {
                    var data = json.result[i];
                    var lat = data.lat;
                    var lng = data.lng;
                    if (lat != undefined && lng != undefined) {
                        $scope.vehicleList[i].lat = lat;
                        $scope.vehicleList[i].lng = lng;
                        var icon;
                        icon = new L.Icon({
                            iconSize: [37.3, 56.6],
                            iconAnchor: [22, 48],
                            iconUrl: 'img/icon2/icon_mylocation.png'
                        });
                        if (markers[i] != undefined) {
                            markers[i].setLatLng([lat, lng]);
                            markers[i].setIcon(icon);
                        } else {
                            var marker = L.marker([lat, lng], {
                                icon: icon,
                                alt: "vehicle",
                                zIndexOffset: 9999
                            });
                            marker.on('click', function () {
                            });
                            var s = "<b>" + data.plate_number + "</b><li>车速：60km/s</li><li>油量：80%</li>";
                            marker.bindPopup(s).openPopup();
                            map.addLayer(marker);
                            //if ($scope.vehicle != undefined && data.id == $scope.vehicle.id)
                            //    map.panTo(new L.LatLng(lat, lng));
                            markers.push(marker);
                        }
                    }
                }
                move = $timeout(vehicleMove, 1000);
            }
        );
    }

    var onMessageArrived = function (message) {
        if (message.destinationName == 'task') {
            var data = new String(message.payloadString);
            var json = JSON.parse(data);
            if (json != null && json.FROM == 'system') {
                var task = json.task;
                var taskId = json.task_id;
                var sendTime = json.sendTime;
                var vehicle_id;
                for (var i = 0; i < $scope.vehicleList.length; i++) {
                    var vehicle = $scope.vehicleList[i];
                    for (var j = 0; j < vehicle.taskList.length; j++) {
                        if (vehicle.taskList[j].id == taskId) {
                            vehicle_id = vehicle.id;
                            vehicle.taskList[j].status = task;
                        }
                    }
                }
                if ($scope.vehicle.id = vehicle_id) {
                    for (var k = 0; k < $scope.vehicle.taskList.length; k++) {
                        if ($scope.vehicle.taskList[k].id == taskId) {
                            $scope.vehicle.taskList[k].status = task;
                            routingLayer.clearLayers();
                            showRecyle();
                        }
                    }
                }
            }

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


    /**
     * 显示收集点
     **/
    function showRecyle() {
        if ($scope.vehicle == undefined) return;
        request.route = new GHroute(new GHInput(), new GHInput());
        var vehicle = $scope.vehicle;
        var depot_lat = vehicle.depot.lat;
        var depot_lng = vehicle.depot.lng;
        var depot_point = new GHInput();
        depot_point.setCoord(depot_lat, depot_lng);
        request.route.add(depot_point, 0);
        removeRecyle();
        var drawedStart = false;
        for (var i = 0; i < vehicle.taskList.length; i++) {
            var task = vehicle.taskList[i];
            var custom = task.taskObject.custom;
            var lat = task.taskObject.custom.lat;
            var lng = task.taskObject.custom.lng;
            if (lat == undefined || lng == undefined)
                continue;
            var point = new GHInput();
            point.setCoord(lat, lng);
            request.route.add(point, i + 1);
            var icon;
            if (task.status == 2) {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_finish.png'
                });
            } else if (task.status == 3) {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_cancel.png'
                });
            } else if (task.status == 4) {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_hold.png'
                });
            }
            else {
                if (!drawedStart) {
                    icon = new L.Icon({
                        iconSize: [37.3, 56.6],
                        iconAnchor: [22, 48],
                        iconUrl: 'img/icon2/icon_current.png'
                    });
                    drawedStart = true;
                } else {
                    icon = new L.Icon({
                        iconSize: [37.3, 56.6],
                        iconAnchor: [22, 48],
                        iconUrl: 'img/icon2/icon_next.png'
                    });
                }
                //else {
                //    icon = new L.Icon({
                //        iconSize: [37.3, 56.6],
                //        iconAnchor: [22, 48],
                //        iconUrl: 'img/icon2/icon_next_serialnumber/icon_next_' + (i + 1) + '.png'
                //    });
                //}
            }
            var marker = L.marker([lat, lng], {icon: icon, alt: "recyle"});
            var s = "<b>" + custom.name + "</b><li>" + custom.address + "</li><li>" + custom.contact + "</li><li>" + custom.telephone + "</li>";
            marker.bindPopup(s).openPopup();
            marker.on('click', function () {
            });
            map.addLayer(marker);
        }
        var reqUrl = request.createURL();
        routingLayer.clearLayers();
        request.doRequest(reqUrl, function (json) {
            if (json.info.errors) {
                var errorMsg = json.info.errors;
                console.log(errorMsg);
                return;
            }
            var path = json.paths[0];
            var geojsonFeature = {
                "type": "Feature",
                "style": {color: "#00cc33", "weight": 5, "opacity": 0.6},
                "geometry": path.points
            }
            routingLayer.addData(geojsonFeature);
        });
    }

    /**
     * 隐藏收集点
     * */
    function removeRecyle() {
        map.eachLayer(function (m) {
            if (m.options.alt == "recyle")
                map.removeLayer(m);
        });
        routingLayer.clearLayers();
    }

    $scope.showVideo = function () {
        toClientID = $scope.vehicle.mqttId;
        $('#webrtcDialog').modal('show');
        send(toClientID, "both", 0, 0, "init", null);
    }


    /*呼叫司机*/
    $scope.showCall = function () {
        toClientID = $scope.vehicle.mqttId;
        onClose();
        getUserMedia({video: false, audio: true}, function (stream) {
            var audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                console.log('Using Audio device: ' + audioTracks[0].label);
            }
            console.log('Adding Local Stream to peer connection');
            pc.addStream(stream);
            send(toClientID, "audio", 1, 0, "init", null);
        }, function (err) {
            console.log('Failed to get local stream', err);
        });
        var msg = Messenger().post({
            message: "正在呼叫司机...",
            hideAfter: 3600,
            actions: {
                cancel: {
                    label: '取消',
                    action: function () {
                        onClose();
                        return msg.cancel();
                    }
                }
            }
        });
    }

    var layer = L.tileLayer(map_host + '/guangfo/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    });

    var layer1 = L.tileLayer(map_host + '/TMC2/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    });

    var map = L.map('map');
    map.setView([23.0511236125, 113.13523000659], 13);
    map.addLayer(layer);
    map.addLayer(layer1);
    var request = new GHRequest();
    request.type = "json";
    request.locale = "zh-cn";
    request.points_encoded = false;
    request.host = route_host;
    //划线
    var routingLayer = L.geoJson();
    routingLayer.addTo(map);
}
