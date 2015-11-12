define(['app', 'service/history/monitoring', 'service/basic/vehicle', 'service/basic/task'], function (app) {
    'use strict';
    app.controller('MonitoringMapCtrl', MonitoringMapCtrl);
});
function MonitoringMapCtrl($scope, map_host, route_host, VehicleService, MonitoringService, TaskService, uiGridConstants, $route, $timeout) {
    $scope.speed = 1;
    $scope.isPlay = false;
    var move;
    var position = 0;
    var speed = 1;
    var marker;

    $scope.$on('$destroy', function(){
        $timeout.cancel(move);
    });

    if ($route.current.params.id) {
        $scope.plan = {id: $route.current.params.id, create_date: $route.current.params.date};
        TaskService.historyCollection($scope.plan.id, $scope.plan.create_date).success(function (data) {
            $scope.vehicleOptions.data = data.list;
        });
    } else {
        return;
    }

    $scope.vehicleOptions = {
        useExternalPagination: false,
        useExternalFiltering: false,
        enableSorting: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        enableRowSelection: true,
        multiSelect: false,
        columnDefs: [
            {name: '车牌号码', field: 'plate_number', width: 150},
            {name: '驾驶人', field: 'personalBase.name', width: 150},
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.vehicle = row.entity;
                initRecord();
                TaskService.historyTask($scope.vehicle.id).success(function (data) {
                    $scope.tasks = data.list;
                    $scope.taskOptions.data = $scope.tasks;
                    drawDemands();
                });
            });
        }
    };

    $scope.taskOptions = {
        useExternalPagination: false,
        useExternalFiltering: false,
        enableSorting: false,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        enableRowSelection: true,
        multiSelect: false,
        columnDefs: [
            {
                name: '餐厅名称', field: 'taskObject.custom.name', width: 150
            },
            {
                name: '地址', field: 'taskObject.custom.address', width: 150
            },
            {
                name: '状态', field: 'status', cellFilter: 'collectionStatus', width: 80
            },
            {
                name: '垃圾量', field: 'capacity',  width: 80
            },
            {
                name: '开始时间', field: 'taskObject.start_time', width: 150
            },
            {
                name: '结束时间', field: 'taskObject.end_time', width: 150
            },
            {
                name: '负责人', field: 'personalBase.name', width: 150
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                map.panTo(new L.LatLng(row.entity.taskObject.custom.lat, row.entity.taskObject.custom.lng), 13);
            });
        }
    };

    function drawDemands() {
        var demands = $scope.tasks;
        if (demands == undefined)
            return;
        request.route = new GHroute(new GHInput(), new GHInput());
        map.eachLayer(function (m) {
            if (m.options.alt == "demand")
                map.removeLayer(m);
        });
        for (var i = 0; i < demands.length; i++) {
            var task = demands[i];
            var custom = demands[i].taskObject.custom;
            var lat = custom.lat;
            var lng = custom.lng;
            if (!lng || !lat) {
                continue;
            }
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
            } else {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_next.png'
                });
            }
            var marker = L.marker([lat, lng], {icon: icon, alt: "demand", zIndexOffset: 0, title: i});
            marker.on('click', function () {

            });
            marker.bindPopup(custom.name).openPopup();
            map.addLayer(marker);


            var point = new GHInput();
            point.setCoord(lat, lng);
            request.route.add(point, i);
        }
        var reqUrl = request.createURL();
        routingLayer.clearLayers();
        request.doRequest(reqUrl, function (json) {
            if (json.info.errors) {
                var errorMsg = json.info.errors;
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

    function initRecord() {
        $scope.isPlay = false;
        $timeout.cancel(move);
        MonitoringService.monitorRecord($scope.plan.create_date, $scope.vehicle.vehicle_id).success(function (data) {
            $('#multiple').text("1x");
            $scope.records = data.list;
            drawChart($scope.records, $scope.plan.create_date.substring(0, 11));
            drawVehicle(0);
        });
    }

    /**
     * 垃圾车移动版本
     **/
    function vehicleMove(i) {
        if (i >= $scope.records.length) {
            $timeout.cancel(move);
            return;
        }
        drawVehicle(i);
        move = $timeout(function () {
            vehicleMove(i + 1);
        }, 1000 / speed);
    }

    /**
     * 设置图标在地图上的位置
     * @param i
     */
    function drawVehicle(i) {
        position = i;
        var data = $scope.records[i];
        if(data==undefined){
            return;
        }
        if(data.lat==undefined||data.lng==undefined){
            return;
        }
        var lat = data.lat;
        var lng = data.lng;
        $("#time").text(data.create_date);
        var pecnet = (i/$scope.records.length * 100)
        //console.log(pecnet.toFixed(0))
        $("#progress").css({width:pecnet.toFixed(0)+"%"});
        if (lat != undefined && lng != undefined) {
            if (marker != undefined) {
                marker.setLatLng([lat, lng]);
            } else {
                var icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_mylocation.png'
                });
                marker = L.marker([lat, lng], {
                    icon: icon,
                    alt: "vehicle",
                    zIndexOffset: 9999
                });
                marker.on('click', function () {
                    //$("#box").show();
                });
                var s = "<li>车速：60km/s</li><li>油量：80%</li>";
                marker.bindPopup(s).openPopup();
                map.addLayer(marker);
                map.panTo(new L.LatLng(lat, lng));
            }
        }
    }

    function drawChart(data, sDate) {
        var formatData = new Array();
        var gasData = new Array();
        if (data.length > 0) {
            var sStartTime = data[0].update_date;
            var startDate = new Date(sStartTime);
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var sTime = item.update_date;
                var date = new Date(sTime);
                var utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 500);
                var speed = parseInt(item.speed);
                var expend_gas = parseFloat(item.expend_gas);
                formatData.push([utcDate, speed])
                gasData.push([utcDate, expend_gas]);
            }
        }
        //设置初始值
        Highcharts.setOptions({
            lang: {
                resetZoom: "返回",
                resetZoomTitle: "回到初始状态"
            }
        });
        $('#container').highcharts({
            chart: {
                zoomType: 'x',
                width: 350,
                panning: true
            },
            title: {
                text: '车速曲线图',
                style: {
                    fontSize: "13px",
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: sDate
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 20 * 1000,
                tickPixelInterval: 96,
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: '车速 (km/h)'
                }
            },
            series: [{
                //data: [[Date.UTC(2014, 11, 23, 0, 14, 40), 68], [Date.UTC(2014, 11, 23, 06, 24, 40), 86], [Date.UTC(2014, 11, 23, 10, 30, 40), 110], [Date.UTC(2014, 11, 23, 14, 48, 40), 90]],
                data: formatData,
                name: "车速",
                //pointStart: Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDay(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds()),
                pointInterval: 24 * 60 * 60 * 1000 // one day
            }],

            //lang: {
            //    // Custom language option
            //    noData: "Nichts zu anzeigen"
            //},
            ///* Custom options */
            noData: {
                // Custom positioning/aligning options
                position: {
                    align: 'center',
                    verticalAlign: 'center',
                    horizontalAlign: 'center'
                },
                // Custom svg attributes
                // Custom css
                style: {
                    fontSize: '15px',
                    color: '#202030'
                }
            }
        });
        $('#gas').highcharts({
            chart: {
                zoomType: 'x',
                width: 350
            },
            title: {
                text: '油耗曲线图',
                style: {
                    fontSize: "13px",
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: sDate
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 20 * 1000,
                tickPixelInterval: 96,
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: '油耗 (L/h)'
                }
            },
            series: [{
                data: gasData,
                name: "油耗",
                pointInterval: 24 * 60 * 60 * 1000 // one day
            }],
            //lang: {
            //    // Custom language option
            //    noData: "Nichts zu anzeigen"
            //},
            ///* Custom options */
            noData: {
                // Custom positioning/aligning options
                position: {
                    align: 'center',
                    verticalAlign: 'center',
                    horizontalAlign: 'center'
                },
                // Custom svg attributes
                // Custom css
                style: {
                    fontSize: '15px',
                    color: '#202030'
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


    /**
     * 播放按钮
     */
    $scope.play = function () {
        $scope.isPlay = true;
        vehicleMove(position);
    }

    $scope.stop = function () {
        $scope.isPlay = false;
        $timeout.cancel(move);
    }

    /**
     * 减速播放
     */
    $scope.backward = function () {
        if (speed <= 1)
            return;
        speed--;
        $scope.speed = speed;
    }

    /**
     * 加速播放
     */
    $scope.forward = function () {
        if (speed >= 20)
            return;
        speed++;
        $scope.speed = speed;
    }
}
