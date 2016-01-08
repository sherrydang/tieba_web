/**
 * Created by sherry on 2016/1/7.
 */
define(['app'], function (app) {
    app.factory('PocketService', PocketService);
});
function PocketService($http, data_host) {
    return {
        obtainRequestToken: function () {
            return $http.post('https://getpocket.com/v3/oauth/request',
                $.param({consumer_key: '49872-f71a02e1b5ea4a3acccf4060', redirect_uri: "http://localhost:8080/#/"}),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        authorizeToken: function (requestToken, redirectUri) {
            return $http.post('https://getpocket.com/auth/authorize?request_token='+requestToken+'&redirect_uri=' + redirectUri);
        },
        getAuthorizedToken: function (code) {
            return $http.post('https://getpocket.com/v3/oauth/authorize',
                $.param({consumer_key: '49872-f71a02e1b5ea4a3acccf4060', code: code}),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        },
        addToPocket: function (accessToken, url, title) {
            return $http.post('https://getpocket.com/v3/add',
                $.param({consumer_key: '49872-f71a02e1b5ea4a3acccf4060', access_token: accessToken, url: url, title:title}),
                {'headers': {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
            );
        }
    };
}