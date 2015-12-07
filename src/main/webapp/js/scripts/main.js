/**
 * Created by alexcai on 15/3/18.
 */
require.config({
    baseUrl: "js/scripts",
    paths: {
        angular: '../lib/angular/angular.min',
        angularRoute: '../lib/angular/angular-route',
        angularUI: '../lib/angular/angular.ui',
        angularAMD: '../lib/requirejs/angularAMD.min',
        ngGrid: '../lib/nggrid/ui-grid-unstable.min'
    },

    shim: {
        angularRoute: {
            deps: ['angular']
        },
        angularAMD: {
            deps: ['angular']
        },
        ngGrid: {
            deps: ['angular']
        },
        angularUI: {
            deps: ['angular']
        }
    },
    deps: ['app']
});