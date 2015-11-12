/**
 * Created by Beary on 2015/2/12.
 */
define(['app', 'service/basic/OperatesTreeCtrl'], function (app) {
    'use strict';
    app.controller('OperatesTreeCtrl', OperatesTreeCtrl);
});
function OperatesTreeCtrl($scope, OperatesTreeService) {
    var operate_no, mtype;
    //一次性查询数据库中所有数据
    OperatesTreeService.treelist().success(function (data) {
        $scope.list = data.list;
    });

    $scope.remove = function (scope) {
        scope.remove();
    };

    $scope.addNew = function (scope, type) {
        mtype = type;
        var ftype;
        console.log("step1" + type);
        console.log("step2" + scope);
        if (scope != null) {
            var nodeData = scope.$modelValue;
            var s;
            if (type == 1) {
                ftype = "menu";
                //menu的编号从xx100到xx990
                //s = nodeData.operate_no;
                //operate_no = s.substring(0, 2);
                operate_no = nodeData.operate_no
            } else if (type == 2) {
                ftype = "button";
                //button的编号从xxxx1到xxxx9
                //s = nodeData.operate_no;
                //operate_no = s.substring(0, 4);
                operate_no = nodeData.operate_no
            }
        } else {
            if (type == 0) {
                ftype = "parent";
                //parent的编号从10000到99000
                //operate_no = "000";
                operate_no = nodeData.operate_no
            }
        }

        $scope.newOperate = {type: ftype};
    };


    $scope.submit = function () {
        console.log("id:" + $scope.newOperate.id);
        //如果该对象有ID，则是修改操作
        if ($scope.newOperate.id) {
            OperatesTreeService.update($scope.newOperate).success(function (data) {
                $scope.responseCode = data;
            });
        } else {
            //如果没有ID，则是新增操作
            if (mtype == 0) {
                //parent的编号从10000到99000
                //operate_no = $scope.newOperate.operate_no + operate_no;
                operate_no = $scope.newOperate.operate_no;
            } else if (mtype == 1) {
                //menu的编号从xx100到xx990
                operate_no = $scope.newOperate.operate_no;
                //operate_no = operate_no + $scope.newOperate.operate_no + "0";
            } else if (mtype == 2) {
                //button的编号从xxxx1到xxxx9
                operate_no = $scope.newOperate.operate_no;
                //operate_no = operate_no + $scope.newOperate.operate_no;

            }
            console.log("operate_no:" + operate_no);
            $scope.newOperate.operate_no = operate_no;
            OperatesTreeService.addSubItem($scope.newOperate).success(function (data) {
                $scope.responseCode = data;
                OperatesTreeService.treelist().success(function (data) {
                    $scope.list = data.list;
                });
            })
        }


    };

    //编辑对应索引下的对象
    $scope.edit = function (scope) {
        $scope.responseCode = {};
        var nodeData = scope.$modelValue;
        $scope.newOperate = nodeData;
    }

    //删除对应索引下的对象
    $scope.delete = function (scope, lev) {
        var nodeData = scope.$modelValue;
        if (lev == 0) {
            if (nodeData.items.length != 0) {
                alert("该组内有子权限，请先清空后再删除");
            } else {
                if (confirm("是否删除?")) {
                    OperatesTreeService.delete(nodeData.id).success(function (data) {
                        $scope.responseCode = data;
                        scope.remove();
                    });
                }
            }
        } else if (lev == 1) {
            if (nodeData.items.length != 0) {
                alert("该组内有子权限，请先清空后再删除");
            } else {
                if (confirm("是否删除?")) {
                    OperatesTreeService.delete(nodeData.id).success(function (data) {
                        $scope.responseCode = data;
                        scope.remove();
                    });
                }
            }
        } else if (lev == 2) {
            if (confirm("是否删除?")) {
                OperatesTreeService.delete(nodeData.id).success(function (data) {
                    $scope.responseCode = data;
                    scope.remove();
                });
            }
        }
    }

    $(".modal").on('hidden.bs.modal', function (e) {
        $scope.responseCode = {};
    });
}
