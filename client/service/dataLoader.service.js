/**
 * Created by pjpandey on 9/9/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.service')
        .factory('DataLoadService', DataLoadService);

    function DataLoadService() {

        var registeredData = [];

        var service = {
            init : init,
            registerData :  registerData,
            getRegisteredData : getRegisteredData,
            processPatching : processPatching
        };

        return service;

        ////////////////
        function init() {
            registeredData = [];
        }
        function registerData(data, columns) {
            var tmpData = {
                col : columns,
                data : data
            };
            registeredData.push(tmpData);
        }

        function processPatching() {
            var finalList = [];
            var i;
            for(i = 0 ; i < registeredData.length; i++) {
                var data = _.map(registeredData[i].data, _pick);
                processList(data);
            }

            function processList(list) {
                if(finalList.length === 0) {
                    finalList = list;
                } else {
                    var tmpList = [];
                    for(var j = 0 ; j < finalList.length; j++) {
                        tmpList.push(_.extend(finalList[i], list[i]));
                    }
                    finalList = tmpList;
                }
            }

            function _pick(currentObject) {
                return _.pick(currentObject, _.pluck(registeredData[i].col, 'name'));
            }
            return finalList;
        }

        function getRegisteredData() {
            return registeredData;
        }
    }
})();