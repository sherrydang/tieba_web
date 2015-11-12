define(['app', 'service/basic/refuelCard'], function (app) {
    'use strict';
    app.controller('RefuelCardCtrl', RefuelCardCtrl);
});
function RefuelCardCtrl($scope, RefuelCardService, uiGridConstants) {
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
                name: '加油卡卡号',
                field: 'card_no'
            },
            {
                name: '加油卡余额',
                field: 'money'
            },
            {
                name: '创建日期',
                field: 'create_date'
            },
            {
                name: '更新日期',
                field: 'update_date'
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
                RefuelCardService.getById($scope.object.id).success(function (data) {
                    $scope.object = data.object;
                });
                //console.log(row);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function () {
                RefuelCardService.get().success(function (data) {
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {

            });
        }
    };
    RefuelCardService.get().success(function (data) {
        $scope.gridOptions.data = data.list;
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
    $scope.add = function () {
        //alert("新增1：" + $scope.object.card_no)
        $scope.gridApi.selection.clearSelectedRows();
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            //alert("更新2：" + $scope.object.money)
            RefuelCardService.update($scope.object).success(function (data) {
                $scope.selectedRow.entity = data.object;
                $scope.responseCode = data;
            });
        } else {
            //alert("新增2：" + $scope.object.card_no)
            RefuelCardService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
            });
        }
    }
    $scope.edit = function () {
        if(!$scope.object.id){
            alert("请选择加油卡");
            return;
        }
        $("#edit").modal('show');
    }
    $scope.delete = function () {
        if(!$scope.object.id){
            alert("请选择加油卡");
            return;
        }
        if (confirm("是否删除?")) {
            RefuelCardService.delete($scope.object.id).success(function (data) {
                $scope.remove();
                $scope.gridOptions.data.push(data.object);
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
}