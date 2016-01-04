/**
 * Created by sherry on 2015/12/31.
 */
define([
    'app', 'service/registerService'
], function (app) {
    app.controller('RegisterCtrl', RegisterCtrl);
});
function RegisterCtrl($scope, RegisterService, Upload, data_host) {

    $scope.userObj = {nickName:'', account:'', password:''};

    document.getElementById("fileInput").onchange = function (evt) {
        var reader = new FileReader();
        $scope.file = evt.target.files[0];

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("image").src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };

    $scope.submitPost = function () {
        uploadImg();
    };

    var uploadImg = function () {
        Upload.upload({
            url: data_host+'/uploadImage',
            method: 'POST',
            transformRequest: angular.identity,
            fileFormDataName: 'pic',
            file: $scope.file
        }).success(function(data){
            $scope.userObj.imageId = data.image.id;
            register();
        }).error(function(r){
            console.log(r);
            swal('出错了','请稍后再做尝试','error');
        }).finally(function () {
            hideLoadingTips();
        });
    };

    var register = function () {
        RegisterService.addRegister($scope.userObj);
    }
}