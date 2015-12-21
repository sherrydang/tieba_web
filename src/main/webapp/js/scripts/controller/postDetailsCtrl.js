/**
 * Created by sherry on 2015/12/17.
 */
define([
    'app', 'service/postService','service/replyService'
], function (app) {
    app.controller('PostDetailsCtrl', PostDetailsCtrl);
});
function PostDetailsCtrl($scope, PostService, ReplyService, $route,$sce) {

    $(document).ready(function () {
        $("textarea").sceditor({
            plugins: "xhtml",
            style: 'js/lib/minified/jquery.sceditor.default.min.css',
            emoticonsRoot: 'images/',
            toolbarExclude:'indent,outdent'
        });
    });

    $scope.postId = $route.current.params.postId;

    $scope.post = {title:'',content:'',replyList:[]};

    $scope.reply = {content:'',postId:$scope.postId,userId:'2'};

    function getPostById(){
        PostService.getPostById($scope.postId).success(function(data){
            $scope.post = data.object;
            console.log(data);
        }).error(function(r){
            console.log(r);
        });
    }
    getPostById();

    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.submitComment = function () {
        $scope.reply.content = $('#reply').val();
        $("#replySubmitBtn").addClass("disabled").text("processing...");
        ReplyService.addReply($scope.reply).success(function (data) {
            if(data.code==200){
                swal("Good job!", data.message, "success");
                getPostById();
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
                $("#replySubmitBtn").removeClass("disabled").text("submit");
            }
        );
        console.log($scope.reply);
    };
}