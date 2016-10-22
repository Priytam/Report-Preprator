/**
 * Created by arkulkar on 10/19/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.service')
        .factory('ApiService', ApiService);

    function ApiService($http) {

        var service = {
            sendQueryRequest : sendQueryRequest

        };

        return service;

        ////////////////

        function sendQueryRequest(body) {
            return $http.post('/api/db', body);
        }
    }
})();