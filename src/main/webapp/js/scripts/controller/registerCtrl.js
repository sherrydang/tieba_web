/**
 * Created by sherry on 2015/12/31.
 */
define([
    'app', 'service/registerService'
], function (app) {
    app.controller('RegisterCtrl', RegisterCtrl);
});
function RegisterCtrl($scope, RegisterService) {

    document.getElementById("fileInput").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("image").src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };

}