define(['app','service/basic/exceptionType'], function (app) {
    'use strict';
    app.controller('ExceptionTypeCtrl', ExceptionTypeCtrl);
});
function ExceptionTypeCtrl($scope, ExceptionTypeService, uiGridConstants) {
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
                name: '异常类型',
                field: 'name'
            },
            {
                name: '是否警告',
                field: 'is_alert',
                cellFilter: 'is_alert'
            },
            {
                name: '创建时间',
                field: 'create_time',
                type: 'date', cellFilter: 'limitTo:11'
            },
            {
                name: '更新时间',
                field: 'update_time',
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
                ExceptionTypeService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {

            });
        }

    };
    ExceptionTypeService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });


    $scope.add = function () {
        $scope.object = {personalBase: {sex: 1, status: 1}};
        $scope.gridApi.selection.clearSelectedRows();
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            ExceptionTypeService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
            });
        } else {
            ExceptionTypeService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);

            });
        }
    }
    $scope.edit = function () {
        if(!$scope.object.id){
            alert("请选择异常类型");
            return;
        }
        $("#edit").modal('show');
    }
    $("#edit").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    })
    $scope.delete = function () {
        if(!$scope.object.id){
            alert("请选择异常类型");
            return;
        }
        if (confirm("是否删除?")) {
            ExceptionTypeService.delete($scope.object.id).success(function (data) {
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
    //timepicker控件
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

    $scope.choose = function () {
        ExceptionTypeService.result($scope.object).success(function (data) {
            $scope.list = data.list;
        });
    }

}
