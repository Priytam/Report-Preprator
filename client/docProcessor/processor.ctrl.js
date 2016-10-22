/**
 * Created by pjpandey on 9/8/2016.
 */
(function() {
    'use strict';

    angular.module('app.docProcessor')
        .controller("DocProcessorCtrl", DocProcessorCtrl);

    function DocProcessorCtrl(DataLoadService, $log, $uibModal){
        var vm = this;
        vm.open = open;
        vm.finish =  finish;
        vm.uploadMoreDoc = uploadMoreDoc;
        vm.selectAll = selectAll;


        vm.selectedDocs =  DataLoadService.getRegisteredData();
        vm.gridOptions = {
            enableFiltering: true,
            flatEntityAccess: true,
            showGridFooter: true,
            fastWatch: true,
            enableSorting: true,
            //showGroupPanel: true,
            showColumnMenu: true,
            enableGridMenu: true,
            exporterMenuPdf: false,
            paginationPageSize: 25,
            exporterCsvFilename: 'self_help_db_download.csv',
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };
        activate();
        //////////////////////////////////

        function activate() {
          //  DataLoadService.init();
        }

        function selectAll() {
            DataLoadService.registerData(vm.gridOptions.data, vm.gridOptions.columnDefs);
        }

        function uploadMoreDoc() {
            vm.gridOptions.data = [];
            vm.gridOptions.columnDefs = [];
        }

        function open() {
            var modalInstance = $uibModal.open({
                templateUrl: 'docProcessor/modal.html',
                controller: 'ModalCtrl',
                controllerAs: 'vm',
                windowClass : 'medium-Modal',
                backdrop : 'static',
                resolve: {
                    items: function () {
                        return vm.gridOptions.columnDefs;
                    }
                }
            });
            modalInstance.result.then(columnSelected, modalCanceled);
        }

        function columnSelected (selectedItem) {
            for(var j =0; j< selectedItem.length; j++){
                if(j < 5) {
                    selectedItem[j].visible = true;
                } else {
                    selectedItem[j].visible = false;
                }
            }
            vm.gridOptions.columnDefs = selectedItem;
            DataLoadService.registerData(vm.gridOptions.data, selectedItem);
        }

        function modalCanceled() {
            $log.info('Modal dismissed at: ' + new Date());
        }

        function finish() {
            var res = DataLoadService.processPatching();
            var columnDefs = [];
            angular.forEach(res[0], function(value, key) {
                if(this.length < 5) {
                    this.push({displayName: key, field : key, visible : true});
                } else {
                    this.push({displayName: key, field : key, visible: false});
                }
            }, columnDefs);
            vm.gridOptions.columnDefs = columnDefs;
            vm.gridOptions.data = res;
        }
    }
})();
