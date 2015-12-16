/**
 * Created by sherry on 2015/12/14.
 */
define([
    'app', 'service/postService'
], function (app) {
    app.controller('EditPostCtrl', EditPostCtrl);
});
function EditPostCtrl($scope, PostService) {
    $scope.postObj = {userId:1, title:'', content:''};
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
            swal("Good job!", "Your post has been submitted!", "success");
            console.log(data);
        }).error(function (r) {
            swal("Try again!","Server error", "warning");
            console.log(r);
        }).finally(
            function () {
                $("#postSubmitBtnId").removeClass("disabled").text("submit");
            }
        );
    };
    
    function getPostById(){
        PostService.getPostById(17).success(function(data){
            $("#post").html(data.object.content);
            //console.log(data);
        }).error(function(r){
            console.log(r);
        });
    }

    getPostById();
}