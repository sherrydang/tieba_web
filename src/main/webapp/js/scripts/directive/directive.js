/**
 * Created by alexcai on 14-4-23.
 */
define(['angularAMD'], function (angularAMD) {
    angularAMD.directive('butterbar', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');

                $rootScope.$on('$routeChangeStart', function () {
                    element.removeClass('hide');
                });

                $rootScope.$on('$routeChangeSucess', function () {
                    element.addClass('hide');
                });
            }
        }
    }]);

    angularAMD.directive('focus', function () {
        return {
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        }
    });

    angularAMD.directive('minDate', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                //ctrl.$validators.minDate = function () {
                //    var start = new Date(attrs.minDate.replace("-", "/").replace("-", "/"));
                //    var end = new Date(modelValue.replace("-", "/").replace("-", "/"));
                //    return ctrl.$isEmpty(modelValue) || (end < start);
                //};
            }
        }
    });

    angularAMD.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);
});

