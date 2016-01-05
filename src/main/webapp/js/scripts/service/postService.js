/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('PostService', PostService);
});
function PostService($http, data_host) {
    return {
        getAllPost: function () {
            //return $http.get('https://www.reddit.com/r/Android/new/.json');
            return $http.get(data_host + '/post/search?methodType=1');
        },
        addPost: function (postObj) {
            return $http.post(data_host + '/post/add',
                $.param(postObj),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        getPostById: function (id) {
            return $http.get(data_host + '/post/search?methodType=2&id=' + id);
        },
        getPostByParams: function (page, size, title) {
            return $http.get(data_host + '/post/search?methodType=3&page=' + page + '&size=' + size + '&title=' + title);
        }
    };
}