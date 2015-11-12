define(['app', 'service/basic/vehicle', 'service/basic/user', 'service/basic/district'], function (app) {
    'use strict';
    app.controller('VehicleCtrl', VehicleCtrl);
    app.controller('VehicleDetailCtrl', VehicleDetailCtrl);
});
function VehicleCtrl($scope, VehicleService, DistrictService, uiGridConstants, $location) {
    $scope.object = {};
    $scope.selectedRow = {};
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
                name: '序号',
                field: 'id',
                sort: {
                    direction: uiGridConstants.DESC
                }, width: 80
            },
            {
                name: '车牌号',
                field: 'plate_number'
            },
            {
                name: '类型',
                field: 'type'
            },
            {
                name: '当前司机',
                field: 'personalBase.name'
            },
            {
                name: '所属省',
                field: 'province_object.name'
            },
            {
                name: '所属市',
                field: 'city_object.name'
            },
            {
                name: '所属区',
                field: 'area_object.name'
            },
            {
                name: '所属街',
                field: 'street_object.name'
            },
            {
                name: '加油卡卡号',
                field: 'card_no'
            },
            {
                name: '车载盒子ID',
                field: 'client_id'
            },
            {
                name: '备注',
                field: 'note'
            },
            {
                name: '购买时间',
                field: 'buy_date',
                type: 'date', cellFilter: 'limitTo:11'
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
                $scope.selectedRow = row;
                //console.log(row);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                VehicleService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            //
            //    $scope.$apply();
            //});
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {
            });
        }
    };
    VehicleService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });
    $scope.add = function () {
        $scope.object = {};
        DistrictService.getPrivate().success(function (data) {
            $scope.province = data.result;
        });
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            VehicleService.update($scope.object).success(function (data) {
                $scope.selectedRow.entity = data.object;
                $scope.responseCode = data;
            });
        } else {
            VehicleService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
            });
        }
    }
    $scope.edit = function () {
        if (!$scope.object.id) {
            alert("请选择车辆");
            return;
        }
        DistrictService.getPrivate().success(function (data) {
            $scope.province = data.result;
        });
        if ($scope.object.province != undefined && $scope.object.province != 0)
            DistrictService.getCity($scope.object.province).success(function (data) {
                $scope.city = data.result;
            });
        if ($scope.object.city != undefined && $scope.object.city != 0)
            DistrictService.getArea($scope.object.city).success(function (data) {
                $scope.area = data.result;
            });
        if ($scope.object.area != undefined && $scope.object.area != 0)
            DistrictService.getStreet($scope.object.area).success(function (data) {
                $scope.street = data.result;
            });
        $("#edit").modal('show');
    }
    $('.modal').on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    })
    $scope.$watch("object.province", function () {
        if ($scope.object.province != undefined && $scope.object.province != 0)
            DistrictService.getCity($scope.object.province).success(function (data) {
                $scope.city = data.result;
            });
    });
    $scope.$watch("object.city", function () {
        if ($scope.object.city != undefined && $scope.object.city != 0)
            DistrictService.getArea($scope.object.city).success(function (data) {
                $scope.area = data.result;
            });
    });
    $scope.$watch("object.area", function () {
        if ($scope.object.area != undefined && $scope.object.area != 0)
            DistrictService.getStreet($scope.object.area).success(function (data) {
                $scope.street = data.result;
            });
    });
    $scope.delete = function () {
        if (!$scope.object.id) {
            alert("请选择车辆");
            return;
        }
        if (confirm("是否删除?")) {
            VehicleService.delete($scope.object.id).success(function (data) {
                $scope.responseCode = data;
                $scope.remove();
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
    $('.date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 0,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        maxView: 4,
        forceParse: 0
    }).on('changeDate', function (ev) {

    });
    $scope.detail = function () {
        if (!$scope.object.id) {
            alert("请选择车辆");
            return;
        }
        if ($scope.object.id != undefined)
            $location.path("/basic/vehicleDetail/" + $scope.object.id);
    }
}

function VehicleDetailCtrl($scope, $route, UserService, VehicleService, uiGridConstants) {

    UserService.list(1, 99).success(function (data) {
        $scope.users = data.list;
    });
    $scope.maintenance = function () {
        $scope.object = {};
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
                    name: '序号',
                    field: 'id',
                    sort: {
                        direction: uiGridConstants.DESC
                    },
                    width: 100
                },
                {
                    name: '保养类别',
                    field: 'category',
                    width: 100
                }, {
                    name: '保养负责人',
                    field: 'person_id',
                    width: 104
                }, {
                    name: '保养车辆',
                    field: 'vehicle_id',
                    width: 100
                }, {
                    name: '保养费用',
                    field: 'cost',
                    width: 100
                }, {
                    name: '保养项目',
                    field: 'details',
                    width: 100
                }, {
                    name: '保养地点',
                    field: 'address',
                    width: 100
                }, {
                    name: '缴费日期',
                    cellFilter: 'limitTo:11',
                    field: 'payment_date',
                    width: 100
                }, {
                    name: '有效日期',
                    cellFilter: 'limitTo:11',
                    field: 'effect_date',
                    width: 100
                }, {
                    name: '失效日期',
                    cellFilter: 'limitTo:11',
                    field: 'failure_date',
                    width: 100
                }, {
                    name: '创建时间',
                    cellFilter: 'limitTo:11',
                    field: 'create_date',
                    width: 100
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.object = row.entity;
                    //console.log(row);
                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    VehicleService.listMaintenance($route.current.params.id, newPage, pageSize).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                });
                //外置搜索
                $scope.gridApi.core.on.filterChanged($scope, function () {
                });
            }
        };
        VehicleService.listMaintenance($route.current.params.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.totalSize;
            $scope.gridOptions.data = data.list;
        });
        $scope.add = function () {
            $scope.object = {vehicle_id: $route.current.params.id};
            $scope.gridApi.selection.clearSelectedRows();
            $("#editMaintenance").modal('show');
        }
        $scope.save = function () {
            if ($scope.object.id) {
                VehicleService.updateMaintenance($scope.object).success(function (data) {
                    $scope.responseCode = data;
                });
            } else {
                VehicleService.addMaintenance($scope.object).success(function (data) {
                    $scope.responseCode = data;
                    $scope.gridOptions.data.push(data.object);
                });
            }
        }
        $scope.edit = function () {
            if (!$scope.object.id) {
                alert("请选择保养");
                return;
            }
            $("#editMaintenance").modal('show');
        }
        $scope.delete = function () {
            if (!$scope.object.id) {
                alert("请选择保养");
                return;
            }
            if (confirm("是否删除?")) {
                VehicleService.deleteMaintenance($scope.object.id).success(function (data) {
                    $scope.responseCode = data;
                    $scope.remove();
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
        $('.date').datetimepicker({
            language: 'zh-CN',
            weekStart: 1,
            todayBtn: 0,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            maxView: 4,
            forceParse: 0
        }).on('changeDate', function (ev) {

        });


    };

    $scope.verification = function () {
        $scope.object = {};
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
                    name: '序号',
                    field: 'id',
                    sort: {
                        direction: uiGridConstants.DESC
                    },
                    width: 100
                },
                {
                    name: '年审类别',
                    field: 'category',
                    width: 100
                }, {
                    name: '年审负责人',
                    field: 'person_id',
                    width: 104
                }, {
                    name: '年审车辆',
                    field: 'vehicle_id',
                    width: 100
                }, {
                    name: '年审费用',
                    field: 'cost',
                    width: 100
                }, {
                    name: '年审项目',
                    field: 'details',
                    width: 100
                }, {
                    name: '年审地点',
                    field: 'address',
                    width: 100
                }, {
                    name: '缴费日期',
                    cellFilter: 'limitTo:11',
                    field: 'payment_date',
                    width: 100
                }, {
                    name: '有效日期',
                    cellFilter: 'limitTo:11',
                    field: 'effect_date',
                    width: 100
                }, {
                    name: '失效日期',
                    cellFilter: 'limitTo:11',
                    field: 'failure_date',
                    width: 100
                }, {
                    name: '创建时间',
                    cellFilter: 'limitTo:11',
                    field: 'create_date',
                    width: 100
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.object = row.entity;
                    //console.log(row);
                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    VehicleService.listAnnualVerification($route.current.params.id, newPage, pageSize).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                });
                //外置搜索
                $scope.gridApi.core.on.filterChanged($scope, function () {
                });
            }
        };
        VehicleService.listAnnualVerification($route.current.params.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.totalSize;
            $scope.gridOptions.data = data.list;
        });
        $scope.add = function () {
            $scope.object = {vehicle_id: $route.current.params.id};
            $scope.gridApi.selection.clearSelectedRows();
            $("#editVerification").modal('show');
        }
        $scope.save = function () {
            if ($scope.object.id) {
                VehicleService.updateAnnualVerification($scope.object).success(function (data) {
                    $scope.responseCode = data;
                });
            } else {
                VehicleService.addAnnualVerification($scope.object).success(function (data) {
                    $scope.responseCode = data;
                    $scope.gridOptions.data.push(data.object);
                });
            }
        }
        $scope.edit = function () {
            if (!$scope.object.id) {
                alert("请选择年审");
                return;
            }
            $("#editVerification").modal('show');
        }
        $scope.delete = function () {
            if (!$scope.object.id) {
                alert("请选择年审");
                return;
            }
            if (confirm("是否删除?")) {
                VehicleService.deleteAnnualVerification($scope.object.id).success(function (data) {
                    $scope.responseCode = data;
                    $scope.remove();
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
        $('.date').datetimepicker({
            language: 'zh-CN',
            weekStart: 1,
            todayBtn: 0,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            maxView: 4,
            forceParse: 0
        }).on('changeDate', function (ev) {

        });
    };

    $scope.insurance = function () {
        $scope.object = {};
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
                    name: '序号',
                    field: 'id',
                    sort: {
                        direction: uiGridConstants.DESC
                    },
                    width: 100
                },
                {
                    name: '保险类别',
                    field: 'category',
                    width: 100
                }, {
                    name: '保险负责人',
                    field: 'person_id',
                    width: 104
                }, {
                    name: '保险车辆',
                    field: 'vehicle_id',
                    width: 100
                }, {
                    name: '保险费用',
                    field: 'cost',
                    width: 100
                }, {
                    name: '保险项目',
                    field: 'details',
                    width: 100
                }, {
                    name: '保险地点',
                    field: 'address',
                    width: 100
                }, {
                    name: '缴费日期',
                    cellFilter: 'limitTo:11',
                    field: 'payment_date',
                    width: 100
                }, {
                    name: '有效日期',
                    cellFilter: 'limitTo:11',
                    field: 'effect_date',
                    width: 100
                }, {
                    name: '失效日期',
                    cellFilter: 'limitTo:11',
                    field: 'failure_date',
                    width: 100
                }, {
                    name: '创建时间',
                    cellFilter: 'limitTo:11',
                    field: 'create_date',
                    width: 100
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.object = row.entity;
                    //console.log(row);
                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    VehicleService.listInsurance($route.current.params.id, newPage, pageSize).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                });
                //外置搜索
                $scope.gridApi.core.on.filterChanged($scope, function () {
                });
            }
        };
        VehicleService.listInsurance($route.current.params.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.totalSize;
            $scope.gridOptions.data = data.list;
        });
        $scope.add = function () {
            $scope.object = {vehicle_id: $route.current.params.id};
            $scope.gridApi.selection.clearSelectedRows();
            $("#editInsurance").modal('show');
        }
        $scope.save = function () {
            if ($scope.object.id) {
                VehicleService.updateInsurance($scope.object).success(function (data) {
                    $scope.responseCode = data;
                });
            } else {
                VehicleService.addInsurance($scope.object).success(function (data) {
                    $scope.responseCode = data;
                    $scope.gridOptions.data.push(data.object);
                });
            }
        }
        $scope.edit = function () {
            if (!$scope.object.id) {
                alert("请选择保险");
                return;
            }
            $("#editInsurance").modal('show');
        }
        $scope.delete = function () {
            if (!$scope.object.id) {
                alert("请选择保险");
                return;
            }
            if (confirm("是否删除?")) {
                VehicleService.deleteInsurance($scope.object.id).success(function (data) {
                    $scope.responseCode = data;
                    $scope.remove();
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
        $('.date').datetimepicker({
            language: 'zh-CN',
            minView: 2,
            maxView: 4,
            format: 'yyyy-mm-dd',
            endDate: new Date()
        }).on('changeDate', function (ev) {

        });
    };

    $scope.ticket = function () {
        $scope.object = {};
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
                    name: '序号',
                    field: 'id',
                    sort: {
                        direction: uiGridConstants.DESC
                    },
                    width: 100
                },
                {
                    name: '年票类别',
                    field: 'category',
                    width: 100
                }, {
                    name: '年票负责人',
                    field: 'person_id',
                    width: 104
                }, {
                    name: '年票车辆',
                    field: 'vehicle_id',
                    width: 100
                }, {
                    name: '年票费用',
                    field: 'cost',
                    width: 100
                }, {
                    name: '年票项目',
                    field: 'details',
                    width: 100
                }, {
                    name: '年票地点',
                    field: 'address',
                    width: 100
                }, {
                    name: '缴费日期',
                    cellFilter: 'limitTo:11',
                    field: 'payment_date',
                    width: 100
                }, {
                    name: '有效日期',
                    cellFilter: 'limitTo:11',
                    field: 'effect_date',
                    width: 100
                }, {
                    name: '失效日期',
                    cellFilter: 'limitTo:11',
                    field: 'failure_date',
                    width: 100
                }, {
                    name: '创建时间',
                    cellFilter: 'limitTo:11',
                    field: 'create_date',
                    width: 100
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.object = row.entity;
                    if ($scope.object.effect_date != undefined && $scope.object.failure_date != undefined)
                        $("input[name=effect_date]").val($scope.object.effect_date.substring(0, 10) + ' - ' + $scope.object.failure_date.substring(0, 10));
                    //console.log(row);
                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    VehicleService.listAnnualTicket($route.current.params.id, newPage, pageSize).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                });
                //外置搜索
                $scope.gridApi.core.on.filterChanged($scope, function () {
                });
            }
        };
        VehicleService.listAnnualTicket($route.current.params.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.totalSize;
            $scope.gridOptions.data = data.list;
        });
        $scope.add = function () {
            $scope.object = {vehicle_id: $route.current.params.id};
            $scope.gridApi.selection.clearSelectedRows();
            $("#editTicket").modal('show');
        }
        $scope.save = function () {
            if ($scope.object.id) {
                VehicleService.updateAnnualTicket($scope.object).success(function (data) {
                    $scope.responseCode = data;
                });
            } else {
                VehicleService.addAnnualTicket($scope.object).success(function (data) {
                    $scope.responseCode = data;
                    $scope.gridOptions.data.push(data.object);
                });
            }
        }
        $scope.edit = function () {
            if (!$scope.object.id) {
                alert("请选择年票");
                return;
            }
            $("#editTicket").modal('show');
        }
        $scope.delete = function () {
            if (!$scope.object.id) {
                alert("请选择年票");
                return;
            }
            if (confirm("是否删除?")) {
                VehicleService.deleteAnnualTicket($scope.object.id).success(function (data) {
                    $scope.responseCode = data;
                    $scope.remove();
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
        $('.date').datetimepicker({
            language: 'zh-CN',
            minView: 2,
            maxView: 4,
            format: 'yyyy-mm-dd',
            endDate: new Date()
        }).on('changeDate', function (ev) {

        });
    };
    $scope.maintenance();

    $(".modal").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
    $(".modal").on('show.bs.modal', function (e) {
        if ($scope.object.effect_date != undefined && $scope.object.failure_date != undefined) {
            $('input[name="effect_date"]').val($scope.object.effect_date.substring(0, 10) + ' - ' + $scope.object.failure_date.substring(0, 10));
            $('input[name="effect_date"]').daterangepicker({
                startDate: $scope.object.effect_date,
                endDate: $scope.object.failure_date
            });
        }
        $('input[name="effect_date"]').daterangepicker({
            format: 'YYYY-MM-DD',
            timePicker: false
        }, function (start, end, label) {
            //console.log(start);
            //console.log(end);
            $scope.object.effect_date = start.format('YYYY-MM-DD');
            $scope.object.failure_date = end.format('YYYY-MM-DD');
        });
    });
}
