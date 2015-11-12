/**
 * Created by alexcai on 14-4-28.
 */
define(['angularAMD'], function (angularAMD) {
    angularAMD.filter('textLight', function () {
        var textLightFilter = function (input) {
            if (Number(input) > 0) {
                input = "$" + input;
            }
            return input;
        }
        return textLightFilter;
    });
    angularAMD.filter('percent', function () {
        var percentFilter = function (input) {

            return input + '%';
        }
        return percentFilter;
    });
    angularAMD.filter('personSex', function () {
        var genderHash = {
            1: '男',
            0: '女'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('personStatus', function () {
        var genderHash = {
            0: '解雇',
            1: '正常',
            2: '被锁'
        };
        return function (input) {
            return genderHash[input];
        };
    });

//异常类型管理
    angularAMD.filter('is_alert', function () {
        var genderHash = {
            0: '否',
            1: '是'

        };
        return function (input) {
            return genderHash[input];
        };
    });
//异常信息查询、警报信息查询
    angularAMD.filter('ExceptionStatus', function () {
        var genderHash = {
            0: '未处理',
            1: '已处理'
        };
        return function (input) {
            return genderHash[input];
        };
    });
//垃圾桶数量
    angularAMD.filter('CountGarbage', function () {
        var countLength = function (input) {
            return input.length;
        }
        return countLength;
    });
    angularAMD.filter('collectionStatus', function () {
        var genderHash = {
            0: '未开始',
            1: '正在进行',
            2: '已完成',
            3: '完成但有异常',
            4: '已挂起'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('solutionStatus', function () {
        var genderHash = {
            0: '编辑中',
            1: '已保存',
            2: '正在执行',
            3: '已暂停',
            4: '已停止',
            8: '已完成',
            9: '完成但有异常',
            10: '正在执行（编辑中）'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('planStatus', function () {
        var genderHash = {
            0: '完成但有异常',
            1: '已完成'
        };
        return function (input) {
            return genderHash[input];
        };
    });

    angularAMD.filter('findNull', function () {
        var isNull = function (input) {
            if (input != null) {
                return true;
            } else {
                return false;
            }
        }
    });

    angularAMD.filter('update_type', function () {
        var genderHash = {
            1: '手持端',
            2: '车载端',
            3: '餐厅端'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('selectFilter', function () {
        var genderHash = {
            false: '否',
            true: '是'
        };
        return function (input) {
            return genderHash[input];
        };
    });
    angularAMD.filter('lockFilter', function () {
        var genderHash = {
            false: '否',
            true: '是'
        };
        return function (input) {
            return genderHash[input];
        };
    });
});



