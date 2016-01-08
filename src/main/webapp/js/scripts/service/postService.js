/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('PostService', PostService);
});
function PostService($http, data_host) {
    return {
        getAllPost: function () {
            return $http.get(data_host + '/post/search?methodType=1');
        },
        getAllPostLogin: function (userId) {
            return $http.get(data_host + '/post/search?methodType=4&userId='+userId);
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
        },
        updateVote: function (object) {
            return $http.post(data_host + '/post/updateVote',
                $.param(object),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        insertVote: function (object) {
            return $http.post(data_host + '/post/insertVote',
                $.param(object),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        }
    };
}