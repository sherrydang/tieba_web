define(['app', 'service/basic/role'], function (app) {
    'use strict';
    app.controller('RoleCtrl', RoleCtrl);
});
function RoleCtrl($scope, RoleService, uiGridConstants) {
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
                }
            },
            {
                name: '名称',
                field: 'name'
            },
            {
                name: '描述',
                field: 'note'
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
                RoleService.getOperateByRoleId($scope.object.id).success(function (data) {
                    $scope.object.operates = data.operate;
                });
                //console.log(row);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                RoleService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {

            });
        }
    };
    RoleService.list().success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });
    RoleService.operators().success(function (data) {
        $scope.operates = data.operate;
    });
    $scope.options = {
        multiple: true,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        }
        ,
        query: function (query) {
            query.callback({results: $scope.operates});
        }
    };
    function findState(id) {
        for (var i=0; i<states.length; i++) {
            for (var j=0; j<states[i].children.length; j++) {
                if (states[i].children[j].id == id) {
                    return states[i].children[j];
                }
            }
        }
    }
    $scope.add = function () {
        $scope.object = {};
        $scope.gridApi.selection.clearSelectedRows();
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            RoleService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
                if ($scope.object.operates != undefined) {
                    RoleService.updateOperate($scope.object.id, $scope.object.operates).success(function (data) {
                        $scope.responseCode = data;
                    });
                }
            });
        } else {
            RoleService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
                if ($scope.object.operates != undefined) {
                    RoleService.updateOperate(data.object.id, $scope.object.operates).success(function (data) {
                        $scope.responseCode = data;
                    });
                }
            });
        }
    }
    $scope.edit = function () {
        if(!$scope.object.id){
            alert("请选择角色");
            return;
        }
        $("#edit").modal('show');
    }
    $scope.delete = function () {
        if(!$scope.object.id){
            alert("请选择角色");
            return;
        }
        if (confirm("是否删除?")) {
            RoleService.delete($scope.object.id).success(function (data) {
                $scope.remove();
            });
        }
    }
    $("#edit").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
    $scope.remove = function () {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (item) {
            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                if ($scope.gridOptions.data[i].id == item.id) {
                    $scope.gridOptions.data.splice(i, 1);
                }
            }
        });
    }
    $scope.selectAll = function () {
        $scope.object.operates = $scope.operates;
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
    $('#button').click(function () {

    })
}