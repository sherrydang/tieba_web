/**
 * Created by sherry on 2015/12/14.
 */
define([
    'app', 'service/editPostService'
], function (app) {
    app.controller('EditPostCtrl', EditPostCtrl);
});
function EditPostCtrl($scope, EditPostService) {
    $scope.postObj = {userId:'', title:'', content:''};
    $(document).ready(function () {
        $("textarea").sceditor({
            plugins: 'bbcode'
        });
    });
    $scope.submitPost = function () {
        console.log($scope.postObj);
        //EditPostCtrl.addPost(postObj);
    }
}