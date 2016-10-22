/**
 * Created by pjpandey on 9/8/2016.
 */
(function() {
    'use strict';

    angular.module('app.dbProcessor')
        .controller("DBModalCtrl", DBModalCtrl);

    function DBModalCtrl(items, $uibModalInstance){
        var vm = this;
        vm.items = items;
        vm.selectedItems;

        vm.ok = function () {
            $uibModalInstance.close(vm.selectedItems);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }


})();
