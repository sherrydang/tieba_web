define(['app', 'service/setting/app_update'], function (app) {
    'use strict';
    app.controller('AppUpdateCtrl', AppUpdateCtrl);
});
function AppUpdateCtrl($scope, AppUpdateService, $timeout, Upload, data_host, uiGridConstants) {
    $scope.object = {'type': 1}
    $scope.responseCode = {};
    var version = '4.2.0';

    $scope.add = function () {
        $scope.object = {type: 1};
        $("#edit").modal('show');
    }

    $scope.download_app = function (download_url) {
        var a;
        a = window.open(download_url, "_blank", "width=0, height=0,status=0");
        a.document.execCommand("SaveAs");
        //a.close();
    };

    $scope.copy_url = function (copyText) {
        if (window.clipboardData) {
            window.clipboardData.setData("Text", copyText)
        }
        else {
            var flashcopier = 'flashcopier';
            if (!document.getElementById(flashcopier)) {
                var divholder = document.createElement('div');
                divholder.id = flashcopier;
                document.body.appendChild(divholder);
            }
            document.getElementById(flashcopier).innerHTML = '';
            var divinfo = '<embed src="js/lib/clipboard/_clipboard.swf" FlashVars="clipboard=' + encodeURIComponent(copyText) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
            document.getElementById(flashcopier).innerHTML = divinfo;
            console.log(divinfo)
        }
        alert('copy成功！' + copyText);
    };
    http://localhost:8080/web/index.html#/setting/app_update
    AppUpdateService.list().success(function (data) {
        $scope.resultList = data.list;
    });

    $scope.uploadApp = function () {
        uploadUsingUpload($scope.file, $scope.object);
    }

    function uploadUsingUpload(file, object) {
        version = object.version;

        file.upload = Upload.upload({
            url: data_host + "/ctrl/setting/uploadNewVersion?type=" + object.type + "&version=" + object.version + "&detail=" + object.detail,
            method: 'POST',
            //headers: {
            //    'my-header': 'my-header-value'
            //},
            transformRequest: angular.identity,
            file: file
        });

        file.upload.then(function (response) {
            $timeout(function () {
                $scope.responseCode = {"code": response.data.code, "message": response.data.message};
                console.log($scope.responseCode);
            });
        }, function (response) {
            if (response.code > 0)
                $scope.errorMsg = response.code + ': ' + response.message;
        });

        file.upload.progress(function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            console.log(parseInt(100.0 * evt.loaded / evt.total))
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            if (file.progress < 100) {
                document.getElementById("btn_upload").disabled = true;
                document.getElementById("btn_reset").disabled = true;
            } else {
                document.getElementById("btn_upload").disabled = false;
                document.getElementById("btn_reset").disabled = false;
                AppUpdateService.list().success(function (data) {
                    $scope.resultList = data.list;
                });
            }
        });

        file.upload.xhr(function (xhr) {
            // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
        });
    }

    $timeout(function () {
        $scope.capture = localStorage.getItem('capture' + version) || 'camera';
        $scope.accept = localStorage.getItem('accept' + version) || 'image/*,audio/*,video/*';
        $scope.acceptSelect = localStorage.getItem('acceptSelect' + version) || 'image/*,audio/*,video/*';
        $scope.disabled = localStorage.getItem('disabled' + version) == 'true' || false;
        $scope.multiple = localStorage.getItem('multiple' + version) == 'true' || false;
        $scope.allowDir = localStorage.getItem('allowDir' + version) == 'true' || true;
        $scope.$watch('capture+accept+acceptSelect+disabled+capture+multiple+allowDir', function () {
            localStorage.setItem('capture' + version, $scope.capture);
            localStorage.setItem('accept' + version, $scope.accept);
            localStorage.setItem('acceptSelect' + version, $scope.acceptSelect);
            localStorage.setItem('disabled' + version, $scope.disabled);
            localStorage.setItem('multiple' + version, $scope.multiple);
            localStorage.setItem('allowDir' + version, $scope.allowDir);
        });
    });
}