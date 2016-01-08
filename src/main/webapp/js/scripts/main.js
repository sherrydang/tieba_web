/**
 * Created by alexcai on 15/3/18.
 */
require.config({
    baseUrl: "js/scripts",
    paths: {
        angular: '../lib/angular/angular.min',
        angularRoute: '../lib/angular/angular-route',
        angularAMD: '../lib/requirejs/angularAMD.min',
        angularSanitize:'../lib/angular/angular-sanitize.min',
        angularCookies:'../lib/angular/angular-cookies.min',
        ngUploadFile: '../lib/upload-progress/ng-file-upload',
        ngUploadFile_shim: '../lib/upload-progress/ng-file-upload-shim'
    },

    shim: {
        angularRoute: {
            deps: ['angular']
        },
        angularAMD: {
            deps: ['angular']
        },
        angularSanitize: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        ngUploadFile: {
            deps: ['angular', 'ngUploadFile_shim']
        }
    },
    deps: ['app']
});