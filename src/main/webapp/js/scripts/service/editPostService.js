/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('EditPostService', EditPostService);
});
function EditPostService($http, data_host) {
    return {
        getAllPost: function () {
            return $http.get('https://www.reddit.com/r/Android/new/.json');
        },
        addPost: function (postObj) {
            return $http.post(data_host, '/ctrl/post/add',
                postObj
            );
        }
    };
}