define(['app', '../../service/history/recycleHistory'], function (app) {
    'use strict';
    app.controller('RecycleHistoryCtrl', RecycleHistoryCtrl);
});
function RecycleHistoryCtrl($scope, RecycleHistoryService, uiGridConstants) {
    var object;
    $scope.gridOptions = {
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
                name: '桶编号',
                field: 'garbage_id',
                sort: {
                    direction: uiGridConstants.DESC
                },
                enableFiltering: false,
                width: 100
            },
            {
                name: '垃圾类型',
                field: 'garbage_type',
                width: 120
            },
            {
                name: '收集量（%）',
                field: 'percent',
                width: 100
            },
            {
                name: '所属收集点',
                field: 'custom_name',
                width: 150
            },
            {
                name: '执行司机',
                field: 'driver_name',
                width: 150
            },
            {
                name: '执行车辆',
                field: 'plate_number',
                width: 150
            },
            {
                name: '回收时间',
                field: 'recycle_date',
                width: 150
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
                object = $scope.object;
                //console.log(row);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                RecycleHistoryService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("数据个数 = " + grid.columns.length);
                for (var i = 1; i < grid.columns.length; i++) {
                    if (grid.columns[i].filters[0].term != null) {
                        switch (i) {
                            case 1:
                                params = "garbage_type=" + grid.columns[i].filters[0].term;
                                break;
                            case 2:
                                params = params + "&percent=" + grid.columns[i].filters[0].term;
                                break;
                            case 3:
                                params = params + "&custom_name=" + grid.columns[i].filters[0].term;
                                break;
                            case 4:
                                params = params + "&driver_name=" + grid.columns[i].filters[0].term;
                                break;
                            case 5:
                                params = params + "&plate_number=" + grid.columns[i].filters[0].term;
                                break;
                            case 6:
                                params = params + "&recycle_date=" + grid.columns[i].filters[0].term;
                                break;
                            default :
                                break;

                        }
                    }
                }
                if (params == "") {
                    getList(1, $scope.gridOptions.paginationPageSize);
                } else {
                    RecycleHistoryService.keysearch(newPage == null ? 1 : newPage, $scope.gridOptions.paginationPageSize, params).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                }
            });
            //分页模块
            getList(1, $scope.gridOptions.paginationPageSize);

            function getList(currentPage, pageSize) {
                //一次性查询数据库中所有数据
                RecycleHistoryService.list(currentPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            }

            $scope.add = function () {
                $scope.object = {};
            }
            $scope.save = function () {
                if ($scope.object.id) {
                    RecycleHistoryService.update($scope.object).success(function (data) {
                        $scope.responseCode = data;
                    });
                } else {
                    RecycleHistoryService.add($scope.object).success(function (data) {
                        $scope.responseCode = data;
                        $scope.list.push(data.object);
                    });
                }
            }
            $scope.edit = function (index) {
                $scope.object = $scope.list[index];
            }
            $scope.delete = function (index) {
                if (confirm("是否删除?")) {
                    RecycleHistoryService.delete($scope.list[index].id).success(function (data) {
                        $scope.responseCode = data;
                        $scope.list.splice(index, 1);
                    });
                }
            }

            $scope.exportExcel = function (newPage, size, params) {
                RecycleHistoryService.history(newPage == null ? 1 : newPage, $scope.gridOptions.paginationPageSize, params).success(function (data) {
                    console.log(data);
                    if (data.code == 405) {
                        alert("暂无数据！");
                    } else if (data.code == 200) {
                        window.location.href = data.url;
                    }
                });
            }
            $('#date').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 0,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                endDate: new Date(),
                minView: 2,
                maxView: 4,
                forceParse: 0
            }).on('changeDate', function (ev) {

            });
            $('#buyDate').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 0,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                endDate: new Date(),
                minView: 2,
                maxView: 4,
                forceParse: 0
            }).on('changeDate', function (ev) {

            });
        }
    };
}