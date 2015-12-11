/**
 * Created by sherry on 2015/12/7.
 */
define([
  'app', 'service/editPostService'
], function (app) {
  app.controller('EditPostCtrl', EditPostCtrl);
});
function EditPostCtrl($scope, EditPostService) {
  $(document).ready(function () {
    $("textarea").sceditor({
      plugins: 'bbcode'
    });
  });
}