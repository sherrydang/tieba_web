define(['../../app', 'service/report/garbage'], function (app) {
    'use strict';
    app.controller('GarbageCountCtrl', GarbageCountCtrl);
});
function GarbageCountCtrl($scope, GarbageCountService) {
    var object;
    $scope.object = {time: 'null'}

    var now = new Date();
    var start_time = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + "00:00";
    var end_time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + "23:59";

    var start_month = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth();
    var end_month = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    var time = start_month + "/" + day + "/" + now.getFullYear() + " 00:00 - " + end_month + "/" + day + "/" + now.getFullYear() + " 23:59"
    $('#reservationtime').val(time);
    $('#reservationtime').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        timePicker12Hour: false,
        format: 'MM/DD/YYYY hh:mm A'
    }, function (start, end, label) {
        var startDate = new Date(start);
        var endDate = new Date(end);
        start_time = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + "00:00";
        end_time = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + "23:59";
    });
    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalFiltering: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {
                name: '司机',
                field: 'person_name',
                visible: false
            },
            {
                name: '车牌',
                field: 'plate_number',
                visible: false

            },
            {
                name: '收运点',
                field: 'custom_name',
                visible: false
            },
            {
                name: '区',
                field: 'area_name',
                visible: false
            },
            {
                name: '镇街',
                field: 'street_name',
                visible: false

            },
            {
                name: '收集时间',
                field: 'times'
            },
            {
                name: '垃圾量（吨）',
                field: 'count'
            }
        ],
        onRegisterApi: function (gridApi) {
            $('#grid').hidden = false;
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {

            });

            $scope.choose = function () {
                $scope.object.start_time = start_time;
                $scope.object.end_time = end_time;
                $scope.object.person_value == true ? $scope.object.person = 0 : $scope.object.person = null;
                $scope.object.vehicle_value == true ? $scope.object.vehicle = 0 : $scope.object.vehicle = null;
                $scope.object.custom_value == true ? $scope.object.custom = 0 : $scope.object.custom = null;
                $scope.object.area_value == true ? $scope.object.area = 0 : $scope.object.area = null;
                $scope.object.street_value == true ? $scope.object.street = 0 : $scope.object.street = null;
                object = $scope.object;

                $scope.gridOptions.columnDefs[0].visible = ($scope.object.person_value == true);
                $scope.gridOptions.columnDefs[1].visible = ($scope.object.vehicle_value == true);
                $scope.gridOptions.columnDefs[2].visible = ($scope.object.custom_value == true);
                $scope.gridOptions.columnDefs[3].visible = ($scope.object.area_value == true);
                $scope.gridOptions.columnDefs[4].visible = ($scope.object.street_value == true);

                GarbageCountService.result(object, $scope.page).success(function (data) {
                    $scope.gridOptions.data = data.result.resultList;
                    drawGarbageCharts(data.result.resultList);
                    console.log(data);
                });
            }
            $scope.exportExcel = function () {
                $scope.object.start_time = start_time;
                $scope.object.end_time = end_time;
                $scope.object.person_value == true ? $scope.object.person = 0 : $scope.object.person = null;
                $scope.object.vehicle_value == true ? $scope.object.vehicle = 0 : $scope.object.vehicle = null;
                $scope.object.custom_value == true ? $scope.object.custom = 0 : $scope.object.custom = null;
                $scope.object.area_value == true ? $scope.object.area = 0 : $scope.object.area = null;
                $scope.object.street_value == true ? $scope.object.street = 0 : $scope.object.street = null;
                object = $scope.object;

                console.log("exportExcel");
                if (object != null) {
                    GarbageCountService.report(object).success(function (data) {
                        console.log(data);
                        if (data.code == 405) {
                            alert("暂无数据！");
                        } else if (data.code == 200) {
                            window.location.href = data.url;
                        }
                    });
                } else {
                    alert("请先筛选出结果");
                }
            }
        }
    };
}

function drawGarbageCharts(data) {
    console.log("garbage~~~~~");
    var formatData = new Array();
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var sTime = item.times;
        var date = new Date(sTime);
        var utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        formatData.push([utcDate, item.count]);
    }
    console.log(formatData);
    $('#chart-body').show();

    $('#garbage-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '垃圾量统计'
        },
        xAxis: {
            type: 'datetime',
            //max: '20px',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '垃圾量（吨）'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            dateTimeLabelFormats: {
                day: "%Y年%m月%e日",
                month: "%Y年%m月",
                year: "%Y年%m月%e日"
            },
            pointFormat: '当日回收垃圾量: <b>{point.y:.1f} 吨</b>'
        },
        series: [{
            name: '垃圾量',
            data: formatData,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });
}
//function GarbageCountCtrl($scope, GarbageCountService) {
//    var object;
//    $scope.object = {time: 'day'}
//    GarbageCountService.objects().success(function (data) {
//        $scope.persons = data.persons;
//        $scope.vehicles = data.vehicles;
//        $scope.customs = data.customs;
//        $scope.areas = data.areas;
//        $scope.streets = data.streets;
//
//    });
//
//    $scope.gridOptions = {
//        paginationPageSizes: [25, 50, 100],
//        paginationPageSize: 25,
//        useExternalPagination: true,
//        useExternalFiltering: true,
//        enableSorting: false,
//        enableRowSelection: false,
//        enableFiltering: true,
//        enableRowHeaderSelection: false,
//        multiSelect: false,
//        columnDefs: [
//            {
//                name: '司机',
//                field: 'person_name'
//            },
//            {
//                name: '车牌',
//                field: 'plate_number'
//
//            },
//            {
//                name: '收运点',
//                field: 'custom_name'
//            },
//            {
//                name: '区',
//                field: 'area_name'
//            },
//            {
//                name: '镇街',
//                field: 'street_name'
//
//            },
//            {
//                name: '收集时间',
//                field: 'times'
//            },
//            {
//                name: '垃圾量',
//                field: 'count'
//            }
//        ]
//    };
//
//    var now = new Date();
//    var start_time = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
//    var end_time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
//
//    $scope.choose = function () {
//        $('#grid').hidden = false;
//        if ($scope.object != undefined) {
//            var person = $scope.object.person != undefined ? $scope.object.person : null;
//            var vehicle = $scope.object.vehicle != undefined ? $scope.object.vehicle : null;
//            var custom = $scope.object.custom != undefined ? $scope.object.custom : null;
//            var area = $scope.object.area != undefined ? $scope.object.area : null;
//            var street = $scope.object.street != undefined ? $scope.object.street : null;
//            var time = $scope.object.time != undefined ? $scope.object.time : null;
//            object = {
//                time: time,
//                start_time: start_time,
//                end_time: end_time,
//                person: person,
//                vehicle: vehicle,
//                custom: custom,
//                area: area,
//                street: street
//            };
//            console.log(object);
//        } else {
//            object = {
//                time: "day",
//                start_time: start_time,
//                end_time: end_time
//            };
//            console.log(object);
//        }
//        $scope.gridOptions.columnDefs[0].visible = (object.person != null);
//        $scope.gridOptions.columnDefs[1].visible = (object.vehicle != null);
//        $scope.gridOptions.columnDefs[2].visible = (object.custom != null);
//        $scope.gridOptions.columnDefs[3].visible = (object.area != null);
//        $scope.gridOptions.columnDefs[4].visible = (object.street != null);
//
//        GarbageCountService.result(object, $scope.page).success(function (data) {
//            $scope.resultList = data.result.resultList;
//            var array = new Array();
//            for (var i = 0; i < data.result.resultList.length; i++) {
//                array[i] = data.result.resultList[i];
//            }
//            $scope.gridOptions.data = data.result.resultList;
//
//            //for()
//
//
//            drawGarbageCharts(data.result.resultList);
//            console.log(data);
//        });
//    }
//    $scope.exportExcel = function () {
//        console.log("exportExcel");
//        if (object != null) {
//            GarbageCountService.report(object).success(function (data) {
//                console.log(data);
//                if (data.code == 405) {
//                    alert("暂无数据！");
//                } else if (data.code == 200) {
//                    window.location.href = data.url;
//                }
//            });
//        } else {
//            alert("请先筛选出结果");
//        }
//    }
//
//    var month = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
//    var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
//    var time = month + "/" + day + "/" + now.getFullYear() + " 1:00 PM - " + month + "/" + day + "/" + now.getFullYear() + " 1:00 PM"
//    $('#reservationtime').val(time);
//    console.log(time);
//
//    $('#reservationtime').daterangepicker({
//        timePicker: true,
//        timePickerIncrement: 30,
//        format: 'MM/DD/YYYY h:mm A'
//    }, function (start, end, label) {
//        console.log(start.toISOString(), end.toISOString(), label);
//        var startDate = new Date(start);
//        var endDate = new Date(end);
//        console.log("----------?" + startDate);
//        start_time = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes();
//        end_time = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes();
//        console.log("----------start_time:" + start_time + "end_time:" + end_time);
//    });
//}