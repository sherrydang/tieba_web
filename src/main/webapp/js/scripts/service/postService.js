/**
 * Created by sherry on 2015/12/7.
 */
define(['app'], function (app) {
    app.factory('PostService', PostService);
});
function PostService($http) {
    return{
        getAllPost: function(){
            return $http.get('https://www.reddit.com/r/Android/new/.json');
        }
    };
}