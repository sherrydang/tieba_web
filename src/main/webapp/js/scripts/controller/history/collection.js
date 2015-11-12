/**
 * Created by Beary on 2015/2/5.
 */
define(['app', 'service/basic/task'], function (app) {
    'use strict';
    app.controller('PlanCtrl', PlanCtrl);
});
function PlanCtrl($scope, $location, TaskService) {
    $scope.object = {};

    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 100],
        paginationPageSize: 25,
        useExternalPagination: true,
        useExternalFiltering: false,
        enableSorting: false,
        enableRowHeaderSelection: false,
        enableRowSelection: true,
        enableFiltering: false,
        multiSelect: false
    }

    $scope.gridOptions.columnDefs = [
        {name: "序号", field: "plan_id", width: 60}, {name: "工作名称", field: 'name'}, {
            name: "收运车总数",
            field: "plan_vehicle_number"
        }, {name: "状态", field: "status", cellFilter: 'planStatus'}, {name: "创建日期", field: "create_date"}
    ];

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            $scope.object = row.entity;
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
            TaskService.historyPlan(newPage, pageSize).success(function (data) {
                $scope.gridOptions.totalItems = data.totalSize;
                $scope.gridOptions.data = data.list;
            });
        });
    };

    $scope.detail = function () {
        $location.path("/history/monitoringMap/" + $scope.object.plan_id + "/" + $scope.object.create_date);
    },

        TaskService.historyPlan(1, $scope.gridOptions.paginationPageSize).success(function (data) {
            $scope.gridOptions.totalItems = data.totalSize;
            $scope.gridOptions.data = data.list;
        });
}