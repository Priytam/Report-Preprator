(function() {
    'use strict';

    angular.module('app.core')
        .config(configure)
        .constant('_',
            window._
        );

    function configure($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push('httpInterceptor');

        $routeProvider
            .when("/doc", {
                templateUrl: "docProcessor/main.html",
                controller: "DocProcessorCtrl",
                controllerAs: "vm"
            })
            .when('/', {
                templateUrl: "selector/selector.html",
                controller: "SelectorCtrl",
                controllerAs: "vm"
            })
            .when('/db', {
                templateUrl: "dbProcessor/main.html",
                controller: "DBProcessorCtrl",
                controllerAs: "vm"
            });
    }

})();
