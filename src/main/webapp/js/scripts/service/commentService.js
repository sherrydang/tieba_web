/**
 * Created by sherry on 2015/12/18.
 */
define(['app'], function (app) {
    app.factory('CommentService', CommentService);
});
function CommentService($http, data_host) {
    return{
        getAllComment: function(){
            //return $http.get('https://www.reddit.com/r/Android/new/.json');
            return $http.get(data_host+'/ctrl/comment/search?methodType=1');
        },
        addComment: function (commentObj) {
            return $http.post(data_host+'/ctrl/comment/add',
                $.param(commentObj),
                {'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getCommentById: function (id) {
            return $http.get(data_host+'/ctrl/comment/search?methodType=2&id='+id);
        }
    };
}