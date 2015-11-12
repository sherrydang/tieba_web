define(['app', 'service/basic/garbage_rfid'], function (app) {
    'use strict';
    app.controller('GarbageRfidCtrl', GarbageRfidCtrl);
});
function GarbageRfidCtrl($scope, GarbageRfidService, uiGridConstants) {
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
                name: 'RFID标识',
                field: 'rfid_id'
            },
            {
                name: '规格标识',
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
                //console.log(row);
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                GarbageRfidService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {

            });
        }
    };
    GarbageRfidService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        //$scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });
    $scope.add = function () {
        $scope.object = {personalBase: {sex: 1, status: 1}};
        $scope.gridApi.selection.clearSelectedRows();
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            GarbageRfidService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
            });
        } else {
            GarbageRfidService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
            });
        }
    }
    $scope.edit = function () {
        if (!$scope.object.id) {
            alert("请选择RFID");
            return;
        }
        $scope.responseCode = {};
        $("#edit").modal('show');
    }
    $("#edit").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
    $scope.delete = function () {
        if (!$scope.object.id) {
            alert("请选择RFID");
            return;
        }
        if (confirm("是否删除?")) {
            GarbageRfidService.delete($scope.object.id).success(function (data) {
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
}