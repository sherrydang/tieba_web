/**
 * Created by sherry on 2015/12/18.
 */
define(['app'], function (app) {
    app.factory('ReplyService', ReplyService);
});
function ReplyService($http, data_host) {
    return{
        getAllReply: function(postId){
            //return $http.get('https://www.reddit.com/r/Android/new/.json');
            return $http.get(data_host+'/ctrl/reply/search?methodType=3&page=1&size=100000&postId='+postId);
        },
        addReply: function (replyObj) {
            return $http.post(data_host+'/ctrl/reply/add',
                $.param(replyObj),
                {'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getReplyById: function (id) {
            return $http.get(data_host+'/ctrl/reply/search?methodType=2&id='+id);
        }
    };
}
