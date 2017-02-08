class SummaryListController{
    constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

       
        let summaryfull = this.API.service('summaryfull', this.API.all('tasks'))
        let clientId = $stateParams.caseId
        var qParams = [];
        qParams['id'] = clientId
        summaryfull.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withOption('paging', false)
                    .withOption('searching', false)
                    .withOption('bInfo', false)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('cassification_id').withTitle('Classification'),
                    DTColumnBuilder.newColumn('director').withTitle('Director'),
                    DTColumnBuilder.newColumn('manager').withTitle('Manager'),
                    DTColumnBuilder.newColumn('s_admin').withTitle('S.Admin'),
                    DTColumnBuilder.newColumn('admin').withTitle('Admin'),
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst Admin'),
                    DTColumnBuilder.newColumn('j_admin').withTitle('Junior Admin'),
                    DTColumnBuilder.newColumn('totalval').withTitle('Total Hours'),
                    DTColumnBuilder.newColumn('totalcost').withTitle('Time Cost'),
                    DTColumnBuilder.newColumn('avgcost').withTitle('Avg Cost / Hours')
             
             

              
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

     let summaryfulltotal = this.API.service('summaryfulltotal', this.API.all('tasks'))
 summaryfulltotal.getList(qParams)
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
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst Admin'),
                    DTColumnBuilder.newColumn('j_admin').withTitle('Junior Admin'),
                    DTColumnBuilder.newColumn('totalval').withTitle('Total Hours'),
                    DTColumnBuilder.newColumn('totalcost').withTitle('Time Cost'),
                    DTColumnBuilder.newColumn('avgcost').withTitle('Avg Cost / Hours')
                ]

                this.displayTable2 = true
            })




                 let company = this.API.service('company', this.API.all('tasks'))

 company.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions3 = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns3 = [
                    DTColumnBuilder.newColumn(null).withTitle('Status').notSortable()
                        .renderWith(actionsHtml2),
                    DTColumnBuilder.newColumn('narration').withTitle('Narration'),
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Date'),
                    DTColumnBuilder.newColumn('director').withTitle('Director'),
                    DTColumnBuilder.newColumn('director_c').withTitle('Director-Cost'),
                    
                    DTColumnBuilder.newColumn('manager').withTitle('Manager'),
                    DTColumnBuilder.newColumn('manager_c').withTitle('Manager-Cost'),
                    
                    DTColumnBuilder.newColumn('s_admin').withTitle('S.Admin'),
                    DTColumnBuilder.newColumn('s_admin_c').withTitle('Ss.Admin-Cost'),
                    
                    DTColumnBuilder.newColumn('admin').withTitle('Admin'),
                    DTColumnBuilder.newColumn('admin_c').withTitle('Admin-Cost'),
                    
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst Admin'),
                    DTColumnBuilder.newColumn('asst_admin_c').withTitle('Asst.Admin-Cost'),
                    
                    DTColumnBuilder.newColumn('j_admin').withTitle('Junior Admin'),
                    DTColumnBuilder.newColumn('j_admin_c').withTitle('J.Admin-Cost'),
                    
                    DTColumnBuilder.newColumn('cassification_id').withTitle('Classification'),
                    DTColumnBuilder.newColumn('justification').withTitle('Justification')
                    
                       
                ]

                this.displayTable3 = true
            })


        let actionsHtml2 = (data) => {
         if (data.is_done==1)
         {
            return `
              <a class="btn btn-xs btn-success">
                    <i class="fa">Completed</i>
                </a>`
            
         }else{
            return `
              <a class="btn btn-xs btn-danger">
                    <i class="fa">Pending</i>
                </a>`
            
         }
        }

    }


    $onInit () {}
}

export const SummaryListComponent = {
    templateUrl: './views/app/components/summary-list/summary-list.component.html',
    controller: SummaryListController,
    controllerAs: 'vm',
    bindings: {}
}
