(function () {
    'use strict';

    angular
        .module('app.core', [
            /*
             * Angular modules
             */
            'ngRoute',
            /*
             * 3rd Party modules
             */
            'ui.grid',
            'ui.grid.exporter',
            'ui.grid.selection',
            'ui.bootstrap',
            'multipleSelect',
            'ui.ace'
        ]);
})();
