define(['app', 'service/basic/user', 'service/basic/district'], function (app) {
    'use strict';
    app.controller('UserCtrl', UserCtrl);
});
function UserCtrl($scope, UserService, DistrictService, uiGridConstants) {
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
                },
                width: 100
            },
            {
                name: '名字',
                field: 'personalBase.name',
                width: 100
            },
            {
                name: '雇员编号',
                field: 'personalBase.employee_no',
                width: 100
            },
            {
                name: 'RFID标识',
                field: 'personalBase.rfid_id',
                width: 120
            },
            {
                name: '性别',
                field: 'personalBase.sex',
                cellFilter: 'personSex',
                width: 60
            },
            {
                name: '出生日期',
                field: 'personalBase.birth',
                type: 'date', cellFilter: 'limitTo:11',
                width: 100
            },
            {
                name: '籍贯省',
                field: 'origin_province_object.name',
                width: 100
            },
            {
                name: '籍贯市',
                field: 'origin_city_object.name',
                width: 100
            },
            {
                name: '籍贯区',
                field: 'origin_area_object.name',
                width: 100
            },
            {
                name: '住址省',
                field: 'family_province_object.name',
                width: 100
            },
            {
                name: '住址市',
                field: 'origin_city_object.name',
                width: 100
            },
            {
                name: '住址区/县',
                field: 'family_area_object.name',
                width: 100
            },
            {
                name: '住址镇/街道',
                field: 'family_street_object.name',
                width: 120
            },
            {
                name: '地址',
                field: 'address',
                width: 300
            },
            {
                name: '联系电话',
                field: 'tel',
                width: 150
            },
            {
                name: '移动电话',
                field: 'mobile',
                width: 150
            },
            {
                name: '电子邮箱',
                field: 'email',
                width: 150
            },
            {
                name: '身份证号',
                field: 'id_card',
                width: 200
            },

            {
                name: '状态',
                field: 'personalBase.status',
                cellFilter: 'personStatus',
                width: 100
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
                UserService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {
            });
        }
    };
    UserService.roles().success(function (data) {
        $scope.roles = data.roles;
    });
    UserService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });
    $scope.add = function () {
        $scope.object = {personalBase: {sex: 1, status: 1}};
        $scope.gridApi.selection.clearSelectedRows();
        DistrictService.getPrivate().success(function (data) {
            $scope.province = data.result;
        });
        $("#edit").modal('show');
    };
    $scope.save = function () {
        if ($scope.object.id) {
            UserService.update($scope.object).success(function (data) {
                $scope.responseCode = data;
                if (data.code == 200) {
                    $scope.selectedRow.entity = data.object;
                    if ($scope.object.roles != undefined) {
                        UserService.updateRole(data.object.person_id, $scope.object.roles).success(function (data) {
                            $scope.responseCode = data;
                        });
                    }
                }
            });
        } else {
            UserService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
                if ($scope.object.roles != undefined) {
                    UserService.updateRole(data.object.person_id, $scope.object.roles).success(function (data) {
                        $scope.responseCode = data;
                    });
                }
            });
        }
    }
    $scope.edit = function () {
        if (!$scope.object.id) {
            alert("请选择人员");
            return;
        }
        DistrictService.getPrivate().success(function (data) {
            $scope.province = data.result;
        });
        if ($scope.object.family_province != undefined && $scope.object.family_province != 0)
            DistrictService.getCity($scope.object.family_province).success(function (data) {
                $scope.family_city = data.result;
            });
        if ($scope.object.family_city != undefined && $scope.object.family_city != 0)
            DistrictService.getArea($scope.object.family_city).success(function (data) {
                $scope.family_area = data.result;
            });
        if ($scope.object.family_area != undefined && $scope.object.family_area != 0)
            DistrictService.getStreet($scope.object.family_area).success(function (data) {
                $scope.family_street = data.result;
            });
        if ($scope.object.origin_province != undefined && $scope.object.origin_province != 0)
            DistrictService.getCity($scope.object.origin_province).success(function (data) {
                $scope.origin_city = data.result;
            });
        if ($scope.object.origin_city != undefined && $scope.object.origin_city != 0)
            DistrictService.getArea($scope.object.origin_city).success(function (data) {
                $scope.origin_area = data.result;
            });
        UserService.getRoleByUserId($scope.object.person_id).success(function (data) {
            $scope.object.roles = data.roles;
            $("#edit").modal('show');
        });
    }
    $("#edit").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    })
    $scope.$watch("object.family_province", function () {
        if ($scope.object.family_province != undefined && $scope.object.family_province != 0)
            DistrictService.getCity($scope.object.family_province).success(function (data) {
                $scope.family_city = data.result;
            });
    });
    $scope.$watch("object.family_city", function () {
        if ($scope.object.family_city != undefined && $scope.object.family_city != 0)
            DistrictService.getArea($scope.object.family_city).success(function (data) {
                $scope.family_area = data.result;
            });
    });
    $scope.$watch("object.family_area", function () {
        if ($scope.object.family_area != undefined && $scope.object.family_area != 0)
            DistrictService.getStreet($scope.object.family_area).success(function (data) {
                $scope.family_street = data.result;
            });
    });
    $scope.$watch("object.origin_province", function () {
        if ($scope.object.origin_province != undefined && $scope.object.origin_province != 0)
            DistrictService.getCity($scope.object.origin_province).success(function (data) {
                $scope.origin_city = data.result;
            });
    });
    $scope.$watch("object.origin_city", function () {
        if ($scope.object.origin_city != undefined && $scope.object.origin_city != 0)
            DistrictService.getArea($scope.object.origin_city).success(function (data) {
                $scope.origin_area = data.result;
            });
    });
    $scope.delete = function () {
        if (!$scope.object.id) {
            alert("请选择人员");
            return;
        }
        if (confirm("是否删除?")) {
            UserService.delete($scope.object.id).success(function (data) {
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
    //select2
    $scope.options = {
        language: "zh-CN",
        multiple: true,
        width: '100%',
        initSelection: function (element, callback) {
            callback($(element).data('$ngModelController').$modelValue);
        },
        query: function (query) {
            query.callback({results: $scope.roles});
        }
    };
    $('.date').datetimepicker({
        language: 'zh-CN',
        //weekStart: 1,
        //todayBtn: 0,
        autoclose: 1,
        //todayHighlight: 1,
        //startView: 2,
        minView: 2,
        maxView: 4,
        //forceParse: 0,
        format: 'yyyy-mm-dd'
    }).on('changeDate', function (ev) {

    });
}