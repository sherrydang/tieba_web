/**
 * Created by sherry on 2015/12/17.
 */
define([
    'app', 'service/postService','service/replyService','service/commentService'
], function (app) {
    app.controller('PostDetailsCtrl', PostDetailsCtrl);
});
function PostDetailsCtrl($scope, PostService, ReplyService, CommentService, $rootScope, $route,$sce) {

    $(document).ready(function () {
        $("#reply").sceditor({
            plugins: "xhtml",
            style: 'js/lib/minified/jquery.sceditor.default.min.css',
            emoticonsRoot: 'images/',
            toolbarExclude:'indent,outdent'
        });

    });

    $scope.postId = $route.current.params.postId;

    //用户回复主体
    $scope.reply = {content:'',postId:$scope.postId,userId:''};

    if($rootScope.loginClient){
        $scope.loginUserId = $rootScope.loginClient.id;
        $scope.reply.userId = $scope.userId;
    }

    function getPostById(){
        PostService.getPostById($scope.postId).success(function(data){
            $scope.post = data.object;
            $scope.post.isOpen = false;
            document.title = $scope.post.title;
        }).error(function(r){
            console.log(r);
        });
    }
    getPostById();

    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };

    $scope.submitReply = function () {
        console.log();
        $scope.reply.content = $('#reply').val();
        $("#replySubmitBtn").addClass("disabled").text("processing...");
        ReplyService.addReply($scope.reply).success(function (data) {
            if(data.code==200){
                swal("Good job!", data.message, "success");
                getPostById();
                //console.log(data);
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
    };

    $scope.showComments = function (reply) {
        var id = reply.id;
        if(reply.isOpen == true){
            reply.isOpen = false;
            $('#comment'+id).hide();
        }else{
            appendComments(reply);
        }
    };

    $scope.submitComment = function(reply) {
        var commentObj = {fromId:$scope.loginUserId, replyId: reply.id, content: ''};
        commentObj.content = $('#textarea'+reply.id).val();
        CommentService.addComment(commentObj).success(function(data){
            if(data.code==200){
                swal("Good job!", data.message, "success");
                appendComments(reply);
                $('#textarea'+reply.id).val('');
            }
            else{
                swal("Sorry",data.message,"warning");
            }
        }).error(function (r) {
            swal("Try again!","Server error", "warning");
            console.log(r);
        })
    };

    var appendComments = function (reply) {
        CommentService.getCmtByRplId(reply.id).success(function(data){
            reply.isOpen = true;
            var list = data.commentList;
            $('#comment'+reply.id+' .comment-list').html('');
            var commentsStr = '';
            if(list.length > 0){
                angular.forEach(list, function (item) {
                    commentsStr = commentsStr
                        + '<div style="padding: 10px 0;"><a class="item-thumbnail" href="/#/userInfo/:'
                        + item.client.id+'"><img src="/showImage?id='+ item.client.imageId
                        +'" style="border-radius: 150px;" width="25" height="25" alt=""> </a>'
                        +'<div class="entry"> <p class="author-line">Submitted'
                        +' by <a href="/#/userInfo/:'+item.client.id
                        +'" class="author"><span>'+ item.client.nickName+'</span></a></p>'
                        +'<div>'+item.content+'</div></div></div>';
                });
                commentsStr += '</div>';
            }
            $('#comment'+reply.id+' .comment-list').append(commentsStr);
            $('#comment'+reply.id).show();
        }).error(function(r){
            console.log(r);
        });

    };

    $scope.showJiathis = function (post) {
        console.log(post.isOpen);
        if (post.isOpen == true) {
            post.isOpen = false;
            $('#jiathis').hide();
            console.log(post.id);
        } else {
            post.isOpen = true;
            $('#jiathis').show();
        }
    };

}