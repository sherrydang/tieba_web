<!-- FULLCALENCAR -->
define(['app', 'service/basic/task', 'service/basic/customer'], function (app) {
    'use strict';
    app.controller('TaskCtrl', TaskCtrl);
    app.controller('TaskDetailCtrl', TaskDetailCtrl);
    //app.controller('TaskSortCtrl', TaskSortCtrl);
    app.controller('TaskBindCtrl', TaskBindCtrl);
    app.controller('TaskPlanCtrl', TaskPlanCtrl);
    app.controller('TaskLogCtrl', TaskLogCtrl);
});
function TaskCtrl($scope, $interval, $location, TaskService) {
    $scope.responseCode = {};
    $scope.object = {};

    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalFiltering: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: false,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {name: '序号', field: 'id', width: 60},
            {name: '名称', field: 'name'},
            {name: '收运车总数', field: 'plan_vehicle_number', enableCellEdit: false},
            {name: '收运点总数', field: 'plan_task_number', enableCellEdit: false},
            {name: '状态', field: 'state', cellFilter: 'solutionStatus', enableCellEdit: false}
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
            });
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                TaskService.modifySolutionName(rowEntity.id, newValue).success(function () {

                });
            });
            TaskService.solutionList().success(function (data) {
                $scope.gridOptions.data = data.plans;
            });

            $scope.$on('$destroy', function () {
                $interval.cancel(autoPushTime);
            })
            /**
             * 计算时间 0.5 分钟重新获取当前参与方案的车辆和任务的状态
             */
            var autoPushTime = $interval(function () {
                TaskService.solutionList().success(function (data) {
                    $scope.gridOptions.data = data.plans;
                });
            }, 30 * 1000);
        }
    }

    $scope.edit = function () {
        if (!$scope.object.id) {
            alert("请选择方案");
            return;
        } else {
            if ($scope.object.state != 0 && $scope.object.state != 10) {
                TaskService.solutionUpdate($scope.object.id).success(function (data) {
                    if (data.result) {
                        if ($scope.object.state == 2)
                            $scope.object.state = 10;
                        else
                            $scope.object.state = 0;
                        $scope.responseCode = {};
                        $location.path("/taskDetail/" + $scope.object.id + "/" + $scope.object.state);
                    }
                    else
                        alert("该方案正在被另一人编辑中，请等待")
                });
            }
        }
    }

    $scope.execute = function () {
        var stop;
        var list = $scope.gridOptions.data;
        angular.forEach(list, function (item) {
            if (item.state == 2 || item.state == 3 || item.state == 10) {
                alert("请先停止执行中的方案。");
                stop = true;
                return;
            }
        });
        if (!stop)
            TaskService.solutionExecute($scope.object.id).success(function (data) {
                if (data.result)
                    $scope.object.state = 2;
            });
    }
    $scope.stop = function () {
        if (confirm("是否确认操作，停止任务将会清空今天的任务记录？")) {
            TaskService.solutionStop($scope.object.id).success(function (data) {
                if (data.result)
                    $scope.object.state = 4;
            });
        }
    }

    //$scope.pause = function () {
    //    TaskService.solutionPause($scope.object.id).success(function (data) {
    //        if (data.result)
    //            $scope.object.state = 3;
    //    });
    //}
    $scope.delete = function () {
        if (confirm("是否删除?")) {
            TaskService.solutionDelete($scope.object.id).success(function (data) {
                if (data.result) {
                    $scope.remove();
                }
            });
        }
    }
    $scope.remove = function () {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                if ($scope.gridOptions.data[i].id == item.id) {
                    $scope.gridOptions.data.splice(i, 1);
                }
            }
        });
    }
    $scope.continue = function () {
        TaskService.solutionContinue($scope.object.id).success(function (data) {
            if (data.result)
                $scope.object.state = 2;
        });
    }
    $scope.log = function () {
        $location.path("/taskLog/" + $scope.object.id);
    }
    $scope.copy = function () {
        TaskService.solutionCopy($scope.object.id).success(function (data) {
            TaskService.solutionList().success(function (data) {
                $scope.gridOptions.data = data.plans;
            });
        });
    }
}
function TaskDetailCtrl($scope, $route, $location, TaskService, CustomerService, $timeout, uiGridConstants) {
    $scope.saveing = false;
    $scope.taskObject = {type: 1};

    //$scope.object = {id: $route.current.params.id, state: $route.current.params.state};
    //if ($scope.object.state == 0) {
    //    alert($scope.object)
    //    TaskService.solutionUpdate($scope.object.id).success(function (data) {
    //        console.log("console-TaskDetailCtrl-----1-----1")
    //    });
    //}
    //

    $scope.$on('$destroy', function () {
        console.log(window.location.href.indexOf("taskBind"))
        if (window.location.href.indexOf("taskBind") == -1) {
            TaskService.leavePage($scope.object.id).success(function (data) {
                console.log("console-TaskDetailCtrl-----1-----2")
            });
        }
    });

    $scope.leaveThisPage = function () {
        TaskService.leavePage($scope.object.id).success(function (data) {
            window.location.href = "#/task";
        });
    }

    $scope.bindedVehicleGridOptions = {
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        enableSelectAll: false,
        columnDefs: [
            {name: '参与', field: 'select', cellFilter: 'selectFilter', enableFiltering: false, width: 80},
            {name: '车牌号', field: 'plate_number', width: 150},
            {name: '驾驶人', field: 'personalbase.name', width: 150}
        ],
        onRegisterApi: function (gridApi) {
            $scope.bindedVehicleGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        }
    }

    $scope.bindedDemandGridOptions = {
        paginationPageSizes: [50, 200, 500],
        paginationPageSize: 200,
        useExternalPagination: true,
        useExternalFiltering: true,
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        enableSelectAll: false,
        multiSelect: true,
        columnDefs: [
            {name: '参与', field: 'select', cellFilter: 'selectFilter', enableFiltering: false, width: 80},
            {name: '名字', field: 'custom.name', width: 250},
            {name: '地址', field: 'custom.address', width: 250},
            {name: '开始时间', field: 'start_time', width: 150},
            {name: '结束时间', field: 'end_time', width: 150}
            //{name: '区', field: 'custom.area_object.name', width: 100},
            //{name: '街', field: 'custom.street_object.name', width: 100},
            //{name: '餐位数', field: 'custom.table_figure', width: 60}
        ],
        onRegisterApi: function (gridApi) {
            $scope.bindedDemandGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });

            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                TaskService.getDemandsWithCache($scope.object.id, newPage, pageSize).success(function (data) {
                    $scope.bindedDemandGridOptions.totalItems = data.result.totalSize;
                    $scope.bindedDemandGridOptions.data = data.result.resultList;
                });
            });

            $scope.leaveThisPage = function () {
                TaskService.leavePage($scope.object.id).success(function (data) {
                    window.location.href = "#/task";
                });
            }

            //外置搜索
            gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("数据个数 = " + grid.columns.length);
                for (var i = 0; i < grid.columns.length; i++) {
                    if (grid.columns[i].filters != null && grid.columns[i].filters.length > 0 && grid.columns[i].filters[0].term != null && grid.columns[i].filters[0].term != '') {
                        switch (i) {
                            case 1:
                                params = params + "&name=" + grid.columns[i].filters[0].term;
                                break;
                            case 2:
                                params = params + "&address=" + grid.columns[i].filters[0].term;
                                break;
                            default :
                                break;
                        }
                    }
                }
                if (params == "") {
                    TaskService.getDemandsWithCache($scope.object.id, 1, $scope.bindedDemandGridOptions.paginationPageSize, params).success(function (data) {
                        $scope.bindedDemandGridOptions.totalItems = data.result.totalSize;
                        $scope.bindedDemandGridOptions.data = data.result.resultList;
                    });
                } else {
                    TaskService.getDemandsWithCache($scope.object.id, newPage == null ? 1 : newPage, $scope.bindedDemandGridOptions.paginationPageSize, params).success(function (data) {
                        $scope.bindedDemandGridOptions.totalItems = data.result.totalSize;
                        $scope.bindedDemandGridOptions.data = data.result.resultList;
                    });
                }
            });
        }
    };

    $scope.customGridOptions = {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalFiltering: true,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {
                name: '名字',
                field: 'name'
                , width: 280
            },
            {
                name: '地址',
                field: 'address'
                , width: 280
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.customGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.taskObject.custom_id = row.entity.id;
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                CustomerService.list(newPage, pageSize).success(function (data) {
                    $scope.customGridOptions.totalItems = data.totalSize;
                    $scope.customGridOptions.data = data.list;
                });
            });

            $scope.leaveThisPage = function () {
                TaskService.leavePage($scope.object.id).success(function (data) {
                    window.location.href = "#/task";
                });
            }

            //外置搜索
            gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("数据个数 = " + grid.columns.length);
                for (var i = 0; i < grid.columns.length; i++) {
                    if (grid.columns[i].filters[0].term != null && grid.columns[i].filters[0].term != '') {
                        switch (i) {
                            case 0:
                                params = params + "&name=" + grid.columns[i].filters[0].term;
                                break;
                            case 1:
                                params = params + "&address=" + grid.columns[i].filters[0].term;
                                break;
                            default :
                                break;
                        }
                    }
                }
                if (params == "") {
                    CustomerService.list(1, $scope.customGridOptions.paginationPageSize, params).success(function (data) {
                        $scope.customGridOptions.totalItems = data.totalSize;
                        $scope.customGridOptions.data = data.list;
                    });
                } else {
                    CustomerService.keysearch(newPage == null ? 1 : newPage, $scope.customGridOptions.paginationPageSize, params).success(function (data) {
                        $scope.customGridOptions.totalItems = data.totalSize;
                        $scope.customGridOptions.data = data.list;
                    });
                }
            });
        }
    };

    var myDate = new Date();
    var m = (myDate.getMonth() + 1) < 10 ? ("0" + (myDate.getMonth() + 1)) : (myDate.getMonth() + 1);
    var d = (myDate.getDate()) < 10 ? ("0" + myDate.getDate()) : (myDate.getDate());
    var minDate = myDate.getFullYear() + "-" + m + "-" + d;
    console.log(minDate)
    $("#effect_date").daterangepicker({
        format: 'YYYY-MM-DD hh:mm:ss',
        timePicker: true,
        minDate: minDate,
        isOneDate: true,
        timePicker12Hour: false
    }, function (start, end, label) {
        if (start.isAfter(end)) {
            alert("开始时间必须小于结束时间1分钟");
            return;
        }
        $scope.taskObject.start_time = start.format('YYYY-MM-DD hh:mm:ss');
        $scope.taskObject.end_time = end.format('YYYY-MM-DD hh:mm:ss');
        console.log("in");
        console.log($scope.taskObject.start_time);
        console.log($scope.taskObject.end_time);
    });

    if ($route.current.params.id) {
        $scope.object = {id: $route.current.params.id, state: $route.current.params.state};
        if ($scope.object.state != 2 && $scope.object.state != 10) {
            TaskService.solutionUpdate($scope.object.id).success(function (data) {
                init();
            });
        } else
            init();
    } else {
        var name = prompt("请输入方案名称", "新方案")
        if (name != null && name != "") {
            TaskService.solutionNew(name).success(function (data) {
                $scope.object = {id: data.plan_id, state: 0};
                init();
            });
        } else {
            $location.path("/task");
        }
    }

    function init() {
        initVehicles();
        initDemands();
        CustomerService.list(1, $scope.customGridOptions.paginationPageSize).success(function (data) {
            $scope.customGridOptions.totalItems = data.totalSize;
            $scope.customGridOptions.data = data.list;
        });
    }

    function initVehicles() {
        TaskService.getVehiclesWithCache($scope.object.id).success(function (data) {
            $scope.bindedVehicleGridOptions.data = data.result;
        });
    }

    function initDemands() {
        TaskService.getDemandsWithCache($scope.object.id, 1, $scope.bindedDemandGridOptions.paginationPageSize).success(function (data) {
            $scope.bindedDemandGridOptions.totalItems = data.result.totalSize;
            $scope.bindedDemandGridOptions.data = data.result.resultList;
        });
    }

    $scope.vehicleAll = function () {
        var select = $scope.bindedVehicleGridApi.selection.getSelectedRows();
        var ids = "";
        angular.forEach(select, function (item) {
            item.select = true;
            ids += "&vehicleIds=" + item.id;
        });
        if (ids == "")
            return;
        $scope.saveing = true;
        TaskService.vehicleBind($scope.object.id, ids).success(function (data) {
            $scope.saveing = false;
            $scope.responseCode = data;
        });
    }

    $scope.demandAll = function () {
        var select = $scope.bindedDemandGridApi.selection.getSelectedRows();
        var ids = "";
        angular.forEach(select, function (item) {
            item.select = true;
            ids += "&taskObjectIds=" + item.id;
        });
        if (ids == "")
            return;
        $scope.saveing = true;
        TaskService.demandBind($scope.object.id, ids).success(function (data) {
            $scope.saveing = false;
            $scope.responseCode = data;
        });
    }

    $scope.vehicleClear = function () {
        if (confirm("取消选择有可能导致任务数据丢失，确认执行吗？")) {
            var select = $scope.bindedVehicleGridApi.selection.getSelectedRows();
            var ids = "";
            angular.forEach(select, function (item) {
                item.select = false;
                ids += "&vehicleIds=" + item.id;
            });
            if (ids == "")
                return;
            $scope.saveing = true;
            TaskService.vehicleUnbind($scope.object.id, ids).success(function (data) {
                $scope.saveing = false;
                $scope.responseCode = data;
            });
        }
    }

    $scope.demandClear = function () {
        if (confirm("取消选择有可能导致任务数据丢失，确认执行吗？")) {
            var select = $scope.bindedDemandGridApi.selection.getSelectedRows();
            var ids = "";
            angular.forEach(select, function (item) {
                item.select = false;
                ids += "&taskObjectIds=" + item.id;
            });
            if (ids == "")
                return;
            $scope.saveing = true;
            TaskService.demandUnbind($scope.object.id, ids).success(function (data) {
                $scope.saveing = false;
                $scope.responseCode = data;
            });
        }
    }
    $scope.addDemand = function () {
        $("#edit").modal("show");
    }
    $scope.saveDemand = function () {
        if ($scope.taskObject.custom_id == undefined) {
            alert("请选择一间收运点！");
            return;
        }
        CustomerService.collectTask($scope.taskObject).success(function (data) {
            $("#edit").modal("hide");
            if (data.code == 200)
                initDemands();
        });
    }
    $scope.save = function () {
        TaskService.solutionSave($scope.object.id).success(function (data) {
            if (data.result) {
                $location.path("/task");
            }
        });
    }

    $scope.cancel = function () {
        TaskService.solutionCancel($scope.object.id).success(function (data) {
            if (data.result) {
                $location.path("/task");
            }
        });
    }
}
function TaskBindCtrl($scope, $route, $location, TaskService, map_host, $timeout, uiGridConstants) {
    $scope.saveing = false;

    if ($route.current.params.id) {
        $scope.object = {id: $route.current.params.id, state: $route.current.params.state};
    } else {
        $location.path("/task");
        return;
    }

    //$scope.object = {id: $route.current.params.id, state: $route.current.params.state};
    //if ($scope.object.state == 0) {
    //    TaskService.solutionUpdate($scope.object.id).success(function (data) {
    //        console.log("console-TaskBindCtrl-----1-----1")
    //    });
    //}
    //
    $scope.$on('$destroy', function () {
        console.log(window.location.href.indexOf("taskDetail"))
        if (window.location.href.indexOf("taskDetail") == -1) {
            TaskService.leavePage($scope.object.id).success(function (data) {
                console.log("console-TaskBindCtrl-----1-----2")
            });
        }
    });

    $scope.leaveThisPage = function () {
        TaskService.leavePage($scope.object.id).success(function (data) {
            window.location.href = "#/task";
        });
    }

    //$scope.vehicle = {demands: []};
    $scope.demands = [];

    getVehicleBinded();
    getDistributableDamand();


    $scope.$watchCollection('demands', function () {
        if ($scope.demands != undefined) {
            $scope.demandGridOptions.data = $scope.demands;
            $scope.drawDemands();
        }
    });
    $scope.$watchCollection('vehicle.demands', function () {
        if ($scope.vehicle != undefined) {
            if ($scope.vehicle.demands != undefined) {
                $scope.vehicleDemandGridOptions.data = $scope.vehicle.demands;
                $scope.drawVehicleDemands();
            }
        }
    });

    $scope.vehicleGridOptions = {
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {name: '锁定', field: 'lock', cellFilter: 'lockFilter', width: 80},
            {name: '车牌号', field: 'plate_number', width: 100},
            {name: '驾驶人', field: 'personalbase.name', width: 100}
        ],
        onRegisterApi: function (gridApi) {
            $scope.vehicleGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if (row.isSelected) {
                    $scope.vehicle = row.entity;
                    getBindedFormVehicle();
                } else {
                    $scope.vehicle = {demands: []};
                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        }
    }

    $scope.demandGridOptions = {
        useExternalPagination: true,
        useExternalFiltering: true,
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        columnDefs: [
            {name: '名字', field: 'custom.name', width: 150},
            {name: '地址', field: 'custom.address', width: 150},
            {name: '开始时间', field: 'start_time', width: 150},
            {name: '结束时间', field: 'end_time', width: 150}
        ],
        onRegisterApi: function (gridApi) {
            $scope.demandGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                map.panTo(new L.LatLng(row.entity.custom.lat, row.entity.custom.lng), 13);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });

            //外置搜索
            gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("可分配数据列数 = " + grid.columns.length);
                for (var i = 0; i < grid.columns.length; i++) {
                    console.debug("可分配数据 = " + i + '' + grid.columns[i].filters[0].term);
                    if (grid.columns[i].filters[0].term != null && grid.columns[i].filters[0].term != '') {
                        switch (i) {
                            case 0:
                                params = params + "&name=" + grid.columns[i].filters[0].term;
                                break;
                            case 1:
                                params = params + "&address=" + grid.columns[i].filters[0].term;
                                break;
                            default :
                                break;
                        }
                    }
                }
                console.debug(params)
                if (params == "") {
                    TaskService.distributableDemand($scope.object.id, 1, 200, params).success(function (data) {
                        $scope.demandGridOptions.totalItems = data.result.totalSize;
                        $scope.demandGridOptions.data = data.result.resultList;
                    });
                } else {
                    TaskService.distributableDemand($scope.object.id, newPage == null ? 1 : newPage, 200, params).success(function (data) {
                        $scope.demandGridOptions.totalItems = data.result.totalSize;
                        $scope.demandGridOptions.data = data.result.resultList;
                    });
                }
            });
        }
    }

    $scope.vehicleDemandGridOptions = {
        showGridFooter: false,
        enableSorting: true,
        enableRowSelection: true,
        enableFiltering: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        columnDefs: [
            {name: '名字', field: 'custom.name', width: 150},
            {name: '地址', field: 'custom.address', width: 150},
            {name: '状态', field: 'status', width: 80, cellFilter: "collectionStatus"},
            {name: '开始时间', field: 'start_time', width: 150},
            {name: '结束时间', field: 'end_time', width: 150}
        ],
        onRegisterApi: function (gridApi) {
            $scope.vehicleDemandGridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                map.panTo(new L.LatLng(row.entity.custom.lat, row.entity.custom.lng), 13);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
        }
    }

    $scope.drawDemands = function () {
        var demands = $scope.demands;
        if (demands == undefined)
            return;
        map.eachLayer(function (m) {
            if (m.options.alt == "demand")
                map.removeLayer(m);
        });
        if (demands.length > 0)
            map.setView([demands[0].custom.lat, demands[0].custom.lng], 13);
        for (var i = 0; i < demands.length; i++) {
            var custom = demands[i].custom;
            var lat = custom.lat;
            var lng = custom.lng;
            if (!lng || !lat) {
                continue;
            }
            var icon = new L.Icon({
                iconSize: [37.3, 56.6],
                iconAnchor: [22, 48],
                iconUrl: 'img/icon2/icon_finish.png'
            });
            var marker = L.marker([lat, lng], {icon: icon, alt: "demand", zIndexOffset: 0, title: i});
            marker.on('click', function () {

            });
            marker.bindPopup(custom.name).openPopup();
            map.addLayer(marker);
        }
    }

    $scope.drawVehicleDemands = function () {
        var demands = $scope.vehicle.demands;
        if (demands == undefined)
            return;
        map.eachLayer(function (m) {
            if (m.options.alt == "vehicleDemand")
                map.removeLayer(m);
        });
        for (var i = 0; i < demands.length; i++) {
            var task = demands[i];
            var custom = task.custom;
            var lat = custom.lat;
            var lng = custom.lng;
            if (!lng || !lat) {
                continue;
            }
            var icon = new L.Icon({
                iconSize: [37.3, 56.6],
                iconAnchor: [22, 48],
                iconUrl: 'img/icon2/icon_next.png'
            });
            var marker = L.marker([lat, lng], {icon: icon, zIndexOffset: 1, alt: "vehicleDemand", title: i});
            marker.bindPopup(custom.name).openPopup();
            marker.on('click', function () {

            });
            map.addLayer(marker);
        }
    }

    $scope.select = function () {
        if ($scope.vehicle.id == undefined) {
            alert("请选择车辆!");
            return;
        }
        if ($scope.saveing)
            return;
        $scope.saveing = true;
        angular.forEach($scope.demandGridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.demandGridOptions.data.length; i++) {
                if ($scope.demandGridOptions.data[i].id == item.id) {
                    $scope.demandGridOptions.data.splice(i, 1);
                }
            }
            $scope.vehicle.demands.push(item);
        });
        $scope.saveDemand();
    }

    $scope.up = function () {
        if ($scope.saveing)
            return;
        $scope.saveing = true;
        angular.forEach($scope.vehicleDemandGridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.vehicleDemandGridOptions.data.length; i++) {
                if ($scope.vehicleDemandGridOptions.data[i].id == item.id) {
                    if (item.status != 0) {
                        alert("只能移动未开始的任务！");
                        return;
                    }
                    if (i == 0) {
                        alert("已经是第一个了！");
                        return;
                    }
                    var after = $scope.vehicleDemandGridOptions.data[i - 1];
                    if (after.status != 0) {
                        alert("只能移动未开始的任务前面！");
                        return;
                    }
                    $scope.vehicleDemandGridOptions.data.splice(i, 1);
                    $scope.vehicleDemandGridOptions.data.splice(i - 1, 0, item);
                    break;
                }
            }
        });
        $scope.saveDemand();
    }

    $scope.down = function () {
        if ($scope.saveing)
            return;
        $scope.saveing = true;
        angular.forEach($scope.vehicleDemandGridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.vehicleDemandGridOptions.data.length; i++) {
                if ($scope.vehicleDemandGridOptions.data[i].id == item.id) {
                    if (item.status != 0) {
                        alert("只能移动未开始的任务！");
                        return;
                    }
                    if (i == $scope.vehicleDemandGridOptions.data.length - 1) {
                        alert("已经是最后一个了！");
                        return;
                    }
                    $scope.vehicleDemandGridOptions.data.splice(i, 1);
                    $scope.vehicleDemandGridOptions.data.splice(i + 1, 0, item);
                    break;
                }
            }
        });
        $scope.saveDemand();
    }

    $scope.delete = function () {
        if ($scope.saveing)
            return;
        $scope.saveing = true;
        angular.forEach($scope.vehicleDemandGridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.vehicleDemandGridOptions.data.length; i++) {
                if ($scope.vehicleDemandGridOptions.data[i].id == item.id) {
                    if (item.status != 0) {
                        alert("已开始任务不能取消！");
                        return;
                    }
                    $scope.vehicleDemandGridOptions.data.splice(i, 1);
                    $scope.demands.splice(0, 0, item);
                    break;
                }
            }
        });
        $scope.saveDemand();
    }


    $scope.saveDemand = function () {
        if ($scope.vehicle.demands == undefined)
            return;
        var ids = "";
        var json = new Array();
        for (var i = 0; i < $scope.vehicle.demands.length; i++) {
            json.push($scope.vehicle.demands[i].id);
            ids += "&taskObjectIds=" + $scope.vehicle.demands[i].id;
        }
        //console.log(json);
        TaskService.modifyDemandToVehicle($scope.object.id, $scope.vehicle.id, ids)
            .success(function (data) {
                $scope.saveing = false;
            }).error(function (data) {
                console.log(data);
                $scope.saveing = false;
            });
    }

    $scope.lock = function () {
        var ids = "";
        angular.forEach($scope.vehicleGridApi.selection.getSelectedRows(), function (item) {
            ids += "&vehicleIds=" + item.id;
        });
        getBindedFormVehicle();
        TaskService.vehicleLock($scope.object.id, ids).success(function (data) {
            $scope.vehicle.lock = true;
        });
    }

    $scope.unlock = function () {
        var ids = "";
        angular.forEach($scope.vehicleGridApi.selection.getSelectedRows(), function (item) {
            ids += "&vehicleIds=" + item.id;
        });
        TaskService.vehicleUnLock($scope.object.id, ids).success(function (data) {
            $scope.vehicle.lock = false;
        });
    }

    var map = L.map('map');
    map.setView([23.0511236125, 113.13523000659], 13);
    map.addLayer(new L.tileLayer(map_host + '/guangfo/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    }));
    map.addLayer(new L.tileLayer(map_host + '/TMC2/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    }));

    var routingLayer = L.geoJson();
    routingLayer.addTo(map);

    $scope.save = function () {
        TaskService.solutionSave($scope.object.id).success(function (data) {
            if (data.result) {
                $location.path("/task");
            }
        });
    }

    $scope.cancel = function () {
        TaskService.solutionCancel($scope.object.id).success(function (data) {
            if (data.result) {
                $location.path("/task");
            }
        });
    }

    function getVehicleBinded() {
        TaskService.vehicleBinded($scope.object.id).success(function (data) {
            $scope.vehicleGridOptions.data = data.result;
        });
        console.log(JSON.stringify($scope.object) + "----")
    }

    function getDistributableDamand() {
        TaskService.distributableDemand($scope.object.id, 1, 300).success(function (data) {
            $scope.demands = data.result.resultList;
        });

    }

    function getBindedFormVehicle() {
        TaskService.bindedFromVehicle($scope.object.id, $scope.vehicle.id).success(function (data) {
            $scope.vehicle.demands = data.demands;
        });
    }
}

function TaskPlanCtrl($scope) {

    $scope.leaveThisPage = function () {
        TaskService.leavePage($scope.object.id).success(function (data) {
            window.location.href = "#/task";
        });
    }

    $('#external-events .fc-event').each(function () {

        //store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });
    });

    /* initialize the calendar
     -----------------------------------------------------------------*/
    $('#calendar').fullCalendar({
        lang: 'zh-cn',
        height: 600,
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function () {
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
        }
    });
}

function TaskLogCtrl($scope, $route, TaskService) {
    if ($route.current.params.id) {
        $scope.object = {id: $route.current.params.id};

        $scope.leaveThisPage = function () {
            TaskService.leavePage($scope.object.id).success(function (data) {
                window.location.href = "#/task";
            });
        }

        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalFiltering: false,
            enableSorting: true,
            enableRowSelection: true,
            enableFiltering: false,
            enableRowHeaderSelection: true,
            multiSelect: false,
            columnDefs: [
                {name: '序号', field: 'id', width: 60},
                {name: '操作内容', field: 'operate'},
                {name: '操作人', field: 'personalBase.name', enableCellEdit: false},
                {name: '操作时间', field: 'create_time', enableCellEdit: false}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    TaskService.solutionLogs($scope.object.id, newPage, pageSize).success(function (data) {
                        $scope.gridOptions.data = data.result.resultList;
                    });
                });
            }
        }

        TaskService.solutionLogs($scope.object.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.result.totalSize;
            $scope.gridOptions.data = data.result.resultList;
        });
    }
}
