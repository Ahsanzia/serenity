class TctListController{
     constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('company', this.API.all('tcs'))
               
        
        var qParams = [];
        qParams['id'] = $stateParams.caseId
        clients.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Date'),
                    DTColumnBuilder.newColumn('narration').withTitle('Detail'),
                    DTColumnBuilder.newColumn('cassification_id').withTitle('Classification'),
                       DTColumnBuilder.newColumn('director').withTitle('Director'),
                    DTColumnBuilder.newColumn('manager').withTitle('Manager'),
                    DTColumnBuilder.newColumn('s_admin').withTitle('S.Admin'),
                    DTColumnBuilder.newColumn('admin').withTitle('Admin'),
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst.Admin'),
                    DTColumnBuilder.newColumn('j_admin').withTitle('J.Admin'),
             DTColumnBuilder.newColumn('tunits').withTitle('T Units'),
              DTColumnBuilder.newColumn('thours').withTitle('T Hours'),
           
                   DTColumnBuilder.newColumn('tcost').withTitle('Total Time cost'),
                   DTColumnBuilder.newColumn('capproved').withTitle('Approved'),
                   DTColumnBuilder.newColumn('cbilled').withTitle('Billed'),
                   DTColumnBuilder.newColumn('unbilled').withTitle('UnBilled'),
           
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }


     
     

 let total = this.API.service('totalfull', this.API.all('tcs'))
 total.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions2 = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('paging', false)
                    .withOption('searching', false)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withOption('bInfo', false)
                    .withBootstrap()

                this.dtColumns2 = [
                    DTColumnBuilder.newColumn('total').withTitle('').withOption('width', '20%'),
                      DTColumnBuilder.newColumn('director').withTitle('Director'),
                    DTColumnBuilder.newColumn('manager').withTitle('Manager'),
                    DTColumnBuilder.newColumn('s_admin').withTitle('S.Admin'),
                    DTColumnBuilder.newColumn('admin').withTitle('Admin'),
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst.Admin'),
                    DTColumnBuilder.newColumn('j_admin').withTitle('J.Admin'),
              DTColumnBuilder.newColumn('tunits').withTitle('T Units'),
              DTColumnBuilder.newColumn('thours').withTitle('T Hours'),
           
                   DTColumnBuilder.newColumn('tcost').withTitle('Total Time cost'),
                   DTColumnBuilder.newColumn('capproved').withTitle('Approved'),
                   DTColumnBuilder.newColumn('cbilled').withTitle('Billed'),
                   DTColumnBuilder.newColumn('unbilled').withTitle('UnBilled'),
                    
                     ]

                this.displayTable2 = true
            })



    }
    $onInit () {}
}

export const TctListComponent = {
    templateUrl: './views/app/components/tct-list/tct-list.component.html',
    controller: TctListController,
    controllerAs: 'vm',
    bindings: {}
}
