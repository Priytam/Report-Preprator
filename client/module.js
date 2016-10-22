/**
 * Created by pjpandey on 9/8/2016.
 */
(function () {
    'use strict';

    angular
        .module('app', [
            /*
             * Core module
             */
            'app.core',
            /*
             * App modules
             */
            'app.directive',
            'app.service',
            'app.docProcessor',
            'app.selector',
            'app.dbProcessor'
        ]);
})();
