define(['app', 'service/basic/customer', 'service/basic/district'], function (app) {
    'use strict';
    app.controller('CustomerCtrl', CustomerCtrl);
    app.controller('CustomerGarbageCtrl', CustomerGarbageCtrl);
});
function CustomerCtrl($scope, CustomerService, uiGridConstants, $location, DistrictService, map_host) {
    $scope.object = {};
    $scope.selectedRow = {};
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
                },
                width: 80
            },

            {
                name: '餐厅名称',
                field: 'name'
                , width: 250
            },
            {
                name: '地址',
                field: 'address'
                , width: 250
            },
            {
                name: '联系人',
                field: 'contact'
                , width: 100
            },
            {
                name: '联系电话',
                field: 'telephone'
                , width: 100
            },
            {
                name: '所属省',
                field: 'province_object.name'
                , width: 100
            },
            {
                name: '所属市',
                field: 'city_object.name'
                , width: 100
            },
            {
                name: '所属区',
                field: 'area_object.name'
                , width: 100
            },
            {
                name: '所属街',
                field: 'street_object.name'
                , width: 100
            },
            {
                name: '编码',
                field: 'cno'
                , width: 100
            },
            {
                name: '餐位数',
                field: 'table_figure'
                , width: 100
            },

            //{
            //    name: '垃圾桶数量',
            //    field: 'garbages',
            //    cellFilter: 'CountGarbage'
            //    , width: 100
            //},

            {
                name: '地居委会',
                field: 'committee'
                , width: 100
            },
            {
                name: '许可证编号',
                field: 'license_no'
                , width: 100
            },
            {
                name: '许可证注册日期',
                field: 'effect_date',
                type: 'date',
                cellFilter: 'limitTo:11',
                width: 150
            },
            {
                name: '许可证到期日期',
                field: 'failure_date',
                type: 'date',
                cellFilter: 'limitTo:11',
                width: 150
            },
            {
                name: '登记时间',
                field: 'create_date',
                type: 'date', cellFilter: 'limitTo:11'
                , width: 150
            }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.object = row.entity;
                $scope.selectedRow = row;
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                CustomerService.list(newPage, pageSize).success(function (data) {
                    $scope.gridOptions.totalItems = data.totalSize;
                    $scope.gridOptions.data = data.list;
                });
            });

            //外置搜索
            gridApi.core.on.filterChanged($scope, function (newPage) {
                var grid = this.grid;
                var params = "";
                console.debug("数据个数 = " + grid.columns.length);
                for (var i = 0; i < grid.columns.length; i++) {
                    if (grid.columns[i].filters[0].term != null && grid.columns[i].filters[0].term != '') {
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
                console.log(params);
                if (params == "") {
                    CustomerService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                } else {
                    CustomerService.keysearch(newPage == null ? 1 : newPage, $scope.gridOptions.paginationPageSize, params).success(function (data) {
                        $scope.gridOptions.totalItems = data.totalSize;
                        $scope.gridOptions.data = data.list;
                    });
                }
            });
        }
    };

    CustomerService.list(1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });
    $scope.add = function () {
        $scope.object = {is_origin: 0, type: 1};
        $scope.gridApi.selection.clearSelectedRows();
        DistrictService.getPrivate().success(function (data) {
            $scope.province = data.result;
        });
        $("#edit").modal('show');
    }
    $scope.save = function () {
        if ($scope.object.id) {
            CustomerService.update($scope.object).success(function (data) {
                $scope.selectedRow.entity = data.object;
                $scope.responseCode = data;
            });
        } else {
            CustomerService.add($scope.object).success(function (data) {
                $scope.responseCode = data;
                $scope.gridOptions.data.push(data.object);
            });
        }
        $("#edit").modal('hide');
    }
    $scope.edit = function () {
        if (!$scope.object.id) {
            alert("请选择收集点");
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
    $(".modal").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
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
            alert("请选择收集点");
            return;
        }
        if (confirm("是否删除?")) {
            CustomerService.delete($scope.object.id).success(function (data) {
                $scope.responseCode = data;
                $scope.remove();
            });
        }
    }
    $scope.detail = function () {
        if (!$scope.object.id) {
            alert("请选择收集点");
            return;
        }
        if ($scope.object.id != undefined)
            $location.path("/basic/customerGarbage/" + $scope.object.id);
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

    var layer = L.tileLayer(map_host + '/guangfo/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    });
    var layer1 = L.tileLayer(map_host + '/TMC2/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 7,
        reuseTiles: true,
        attributionControl: true
    });

    var map = L.map('map');
    map.addLayer(layer);
    map.addLayer(layer1);

    $('#showMap').on('shown.bs.tab', function (e) {
        map.setView([23.0511236125, 113.13523000659], 13);
        map.eachLayer(function (m) {
            if (m.options.alt == "recyle")
                map.removeLayer(m);
        });
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            var custom = $scope.gridOptions.data[i];
            var lat = custom.lat;
            var lng = custom.lng;
            if (!lat || !lng) {
                continue;
            }
            var icon;
            if ($scope.object != undefined && custom.id == $scope.object.id) {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_current.png'
                });
            } else {
                icon = new L.Icon({
                    iconSize: [37.3, 56.6],
                    iconAnchor: [22, 48],
                    iconUrl: 'img/icon2/icon_next.png'
                });
            }
            var marker = L.marker([lat, lng], {icon: icon, alt: "recyle"});
            var s = "<b>" + custom.name + "</b><li>" + custom.address + "</li><li>" + custom.contact + "</li><li>" + custom.telephone + "</li>";
            marker.bindPopup(s).openPopup();
            marker.on('click', function () {

            });
            map.addLayer(marker);
        }
    });
    $scope.show = function () {
        if (!$scope.object.id) {
            alert("请选择收集点");
            return;
        }
        CustomerService.image($scope.object.id).success(function (data) {
            $scope.images = data.images;
            console.log($scope.images)
            if ($scope.images.length == 0) {
                alert("暂无图片");
                return;
            }
            $("#image").modal('show');
            $("#carousel-example-generic").carousel('pause');
        });
    }

    $scope.host = CustomerService.host();
    $scope.showErro = function () {
        alert("暂无图片");
    }

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

//某个餐厅所拥有的垃圾桶信息
function CustomerGarbageCtrl($scope, $route, CustomerGarbageService, uiGridConstants) {
    console.log("lalala:" + $route.current.params.id);
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
                field: 'garbage_id',
                sort: {
                    direction: uiGridConstants.DESC
                }
            },
            {
                name: 'RFID标签',
                field: 'personalBaseByPersonId.name'
            },
            {
                name: '经手司机',
                field: 'personalBaseByPersonId.name'
            },
            {
                name: '垃圾类型',
                field: 'garbageObject.garbageType.name'
            },
            {
                name: '接收时间',
                cellFilter: 'limitTo:11',
                field: 'receive_date'
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

                CustomerGarbageService.GarbageList($route.current.params.id, newPage, pageSize).success(function (data) {
                    console.log("hahah:" + data);
                    $scope.gridOptions.data = data.list;
                });
            });
            //外置搜索
            $scope.gridApi.core.on.filterChanged($scope, function () {
            });
        }
    };

    CustomerGarbageService.GarbageList($route.current.params.id, 1, $scope.gridOptions.paginationPageSize).success(function (data) {
        $scope.gridOptions.totalItems = data.totalSize;
        $scope.gridOptions.data = data.list;
    });

    $('.date').datetimepicker({
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