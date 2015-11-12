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
        ngGrid: '../lib/nggrid/ui-grid-unstable.min',
        ngUploadFile: '../lib/upload-progress/ng-file-upload',
        ngUploadFile_shim: '../lib/upload-progress/ng-file-upload-shim',
        tree: '../lib/uiTree/angular-ui-tree.min'
    },

//<script type="text/javascript" src="js/lib/upload-progress/ng-file-upload.js"></script>
//<script type="text/javascript" src="js/lib/upload-progress/ng-file-upload-shim.js"></script>

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
        tree: {
            deps: ['angular']
        },
        angularUI: {
            deps: ['angular']
        },
        ngUploadFile: {
            deps: ['angular', 'ngUploadFile_shim']
        }
    },
    deps: ['app']
});