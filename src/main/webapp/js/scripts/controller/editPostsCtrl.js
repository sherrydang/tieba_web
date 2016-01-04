/**
 * Created by sherry on 2015/12/14.
 */
define([
    'app', 'service/postService'
], function (app) {
    app.controller('EditPostCtrl', EditPostCtrl);
});
function EditPostCtrl($scope, PostService, $rootScope) {
    $scope.postObj = {title:'', content:'', userId:''};
    if($rootScope.loginClient){
        $scope.postObj.userId = $rootScope.loginClient.id;
    }
    $(document).ready(function () {
        $("textarea").sceditor({
            plugins: "xhtml",
            style: 'js/lib/minified/jquery.sceditor.default.min.css',
            emoticonsRoot: 'images/'
        });
    });
    $scope.submitPost = function () {
        $scope.postObj.content = $("#postContent").val();
        $("#postSubmitBtnId").addClass("disabled").text("processing...");
        PostService.addPost($scope.postObj).success(function (data) {
            if(data.code==200){
                swal("Good job!", data.message, "success");
                console.log(data);
            }
            else{
                swal("Sorry",data.message,"warning");
            }
        }).error(function (r) {
            swal("Try again!","Server error", "warning");
            console.log(r);
        }).finally(
            function () {
                $("#postSubmitBtnId").removeClass("disabled").text("submit");
            }
        );
    };
}