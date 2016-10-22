/**
 * Created by pjpandey on 9/8/2016.
 */
(function() {
    'use strict';

    angular.module('app.dbProcessor')
        .controller("DBProcessorCtrl", DBProcessorCtrl);

    function DBProcessorCtrl(DataLoadService, $log, $uibModal, _, ApiService){
        var vm = this;
        vm.db = {};
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
            exporterCsvFilename: 'cdp_db_download.csv',
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };
        vm.query = query;
        vm.finish = finish;
        vm.open = open;
        vm.queryMore = queryMore;
        vm.selectAll = selectAll;
        vm.selectedDocs =  DataLoadService.getRegisteredData();
        activate();
        ///////////////////

        function activate() {
         //   DataLoadService.init();
        }

        function selectAll() {
            DataLoadService.registerData(vm.gridOptions.data, vm.gridOptions.columnDefs);
        }

        function queryMore() {
            vm.gridOptions.data = [];
            vm.gridOptions.columnDefs = [];
        }

        function open() {
            var modalInstance = $uibModal.open({
                templateUrl: 'dbProcessor/modal.html',
                controller: 'DBModalCtrl',
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

        function query() {
            ApiService.sendQueryRequest(vm.db).then(success, err)
        }

        function success(res) {
            var data = res.data.record;

            var columnDefs = [];
            angular.forEach(data[0], function (value, key) {
                if(this.length < 5) {
                    this.push({displayName: key, field : key, visible : true});
                } else {
                    this.push({displayName: key, field : key, visible: false});
                }
            }, columnDefs);

            vm.gridOptions.columnDefs = columnDefs;
            vm.gridOptions.data = data;
        }

        function err(err) {
            var err = err;
        }
        //////////editor//////////////
        vm.aceLoaded = function(_editor){
            var _session = _editor.getSession();
            var _renderer = _editor.renderer;
            _editor.setReadOnly(false);
            _editor.setFontSize(16);
            _editor.setTheme("ace/theme/twilight");
            _session.setUndoManager(new ace.UndoManager());
            _renderer.setShowGutter(true);
            _session.setMode("ace/mode/mysql");
            // Events
            _editor.on("changeSession", function(){
                //console.log('changeSession');
            });
            _session.on("change", function() {
                // console.log('change');
            });
        };

    }
})();
