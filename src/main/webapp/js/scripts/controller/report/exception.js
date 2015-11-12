define(['app', 'service/report/exception'], function (app) {
    'use strict';
    app.controller('ExceptionCountCtrl', ExceptionCountCtrl);
});
function ExceptionCountCtrl($scope, ExceptionCountService) {
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
                name: '驾驶人',
                field: 'person_name',
                visible: false
            },
            {
                name: '收运车',
                field: 'plate_number',
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
                name: '出现时间',
                field: 'times'
            },
            {
                name: '次数',
                field: 'count'
            }
        ],
        onRegisterApi: function (gridApi) {
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
                $scope.object.area_value == true ? $scope.object.area = 0 : $scope.object.area = null;
                $scope.object.street_value == true ? $scope.object.street = 0 : $scope.object.street = null;
                object = $scope.object;

                $scope.gridOptions.columnDefs[0].visible = ($scope.object.person_value == true);
                $scope.gridOptions.columnDefs[1].visible = ($scope.object.vehicle_value == true);
                $scope.gridOptions.columnDefs[2].visible = ($scope.object.area_value == true);
                $scope.gridOptions.columnDefs[3].visible = ($scope.object.street_value == true);

                ExceptionCountService.result($scope.object, $scope.page).success(function (data) {
                    $scope.gridOptions.data = data.result.resultList;
                    console.log($scope.resultList);
                    drawExceptionCharts(data.result.resultList);
                });
            }
            $scope.exportExcel = function () {
                $scope.object.start_time = start_time;
                $scope.object.end_time = end_time;
                $scope.object.person_value == true ? $scope.object.person = 0 : $scope.object.person = null;
                $scope.object.vehicle_value == true ? $scope.object.vehicle = 0 : $scope.object.vehicle = null;
                $scope.object.area_value == true ? $scope.object.area = 0 : $scope.object.area = null;
                $scope.object.street_value == true ? $scope.object.street = 0 : $scope.object.street = null;
                object = $scope.object;

                if (object != null) {
                    ExceptionCountService.report(object).success(function (data) {
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
function drawExceptionCharts(data) {
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

    $('#exception-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '异常次数统计'
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
                text: '异常数（次）'
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
            pointFormat: '当日异常次数: <b>{point.y} 次</b>'
        },
        series: [{
            name: '异常数',
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
//function ExceptionCountCtrl($scope, ExceptionCountService) {
//    var object;
//    $scope.object = {time:'day'}
//    ExceptionCountService.objects().success(function (data) {
//        $scope.persons = data.persons;
//        $scope.vehicles = data.vehicles;
//        $scope.customs = data.customs;
//        $scope.areas = data.areas;
//        $scope.streets = data.streets;
//    });
//
//    var now = new Date();
//    var start_time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
//    var end_time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
//
//    var month = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
//    var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
//    var time = month + "/" + day + "/" +now.getFullYear() + " 1:00 PM - " + month + "/" + day + "/" +now.getFullYear() + " 1:00 PM"
//    $('#reservationtime').val(time);
//    console.log(time);
//
//    $scope.choose = function () {
//        $scope.object = {time: "day", start_time: start_time, end_time: end_time};
//        object = $scope.object;
//        RechargeCountService.result($scope.object, $scope.page).success(function (data) {
//            $scope.resultList = data.result.resultList;
//            console.log($scope.resultList);
//            drawRechargeCharts(data.result.resultList)
//        });
//
//        ExceptionCountService.result($scope.object, $scope.page).success(function (data) {
//            $scope.resultList = data.result.resultList;
//            console.log($scope.resultList);
//            drawExceptionCharts(data.result.resultList);
//        });
//    }
//    $scope.exportExcel = function () {
//        console.log("exportExcel");
//        if (object != null) {
//            ExceptionCountService.report(object).success(function (data) {
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
//    $('#reservationtime').daterangepicker({
//        timePicker: true,
//        timePickerIncrement: 30,
//        format: 'MM/DD/YYYY h:mm A'
//    }, function(start, end, label) {
//        console.log(start.toISOString(), end.toISOString(), label);
//        var startDate = new Date(start);
//        var endDate = new Date(end);
//        console.log("----------?" + startDate);
//        start_time = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes();
//        end_time = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate() + " " + endDate.getHours() + ":" + endDate.getMinutes();
//        console.log("----------start_time:" + start_time + "end_time:" + end_time);
//    });
//}
