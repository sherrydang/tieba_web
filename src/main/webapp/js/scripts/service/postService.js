/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('PostService', PostService);
});
function PostService($http, data_host) {
    return{
        getAllPost: function(){
            //return $http.get('https://www.reddit.com/r/Android/new/.json');
            return $http.get(data_host+'/ctrl/post/search?methodType=1');
        },
        addPost: function (postObj) {
            return $http.post(data_host+'/ctrl/post/add',
                $.param(postObj),
                {'headers':{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getPostById: function (id) {
            return $http.get(data_host+'/ctrl/post/search?methodType=2&id='+id);
        }
    };
}