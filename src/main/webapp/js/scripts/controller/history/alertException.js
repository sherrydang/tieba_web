/**
 * Created by Beary on 2015/2/6.
 */
define(['app', 'service/history/alertException'], function (app) {
    'use strict';
    app.controller('AlertExceptionCtrl', AlertExceptionCtrl);
});
function AlertExceptionCtrl($scope, AlertExceptionService, uiGridConstants) {
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
                name: '序号',
                field: 'id',
                sort: {
                    direction: uiGridConstants.DESC
                }
            },
            {
                name: '警报类型',
                field: 'name'
            },
            {
                name: '发生时间',
                field: 'create_time'
            },
            {
                name: '车牌号',
                field: 'plate_number'
            },
            {
                name: '驾驶司机',
                field: 'pname'
            },
            {
                name: '状态',
                field: 'status',
                cellFilter: 'ExceptionStatus'
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
                AlertExceptionService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("数据个数 = " + grid.columns.length);
                for (var i = 0; i < grid.columns.length; i++) {
                    if (grid.columns[i].filters[0].term != null) {
                        switch (i) {
                            case 0:
                                params = "id=" + grid.columns[i].filters[0].term;
                                break;
                            case 1:
                                params = params + "&name=" + grid.columns[i].filters[0].term;
                                break;
                            case 2:
                                params = params + "&create_time=" + grid.columns[i].filters[0].term;
                                break;
                            case 3:
                                params = params + "&plate_number=" + grid.columns[i].filters[0].term;
                                break;
                            case 4:
                                params = params + "&pname=" + grid.columns[i].filters[0].term;
                                break;
                            case 5:
                                params = params + "&status=" + grid.columns[i].filters[0].term;
                                break;
                            default :
                                break;

                        }
                    }
                }
                if (params == "") {
                    getList(1, $scope.gridOptions.paginationPageSize);
                } else {
                    AlertExceptionService.keysearch(newPage == null ? 1 : newPage, $scope.gridOptions.paginationPageSize, params).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                }
            });
            //分页模块
            getList(1, $scope.gridOptions.paginationPageSize);

            function getList(currentPage, pageSize) {
                //一次性查询数据库中所有数据
                AlertExceptionService.list(currentPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            };

            $scope.exportExcel = function (newPage, size, params) {
                AlertExceptionService.history(newPage == null ? 1 : newPage, $scope.gridOptions.paginationPageSize, params).success(function (data) {
                    console.log(data);
                    if (data.code == 405) {
                        alert("暂无数据！");
                    } else if (data.code == 200) {
                        window.location.href = data.url;
                    }
                });
            };
        }
    };
}