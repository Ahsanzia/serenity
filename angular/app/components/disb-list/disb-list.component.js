class DisbListController{
   constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('disbs')

        var qParams = [];
        qParams['c_type'] = $stateParams.type
        clients.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('name').withTitle('Case Name'),
                    DTColumnBuilder.newColumn('casetype').withTitle('Case Type'),
                    DTColumnBuilder.newColumn('appdate').withTitle('Appointment Date'),
                    DTColumnBuilder.newColumn('tcost').withTitle('Total Disbursments'),
                    DTColumnBuilder.newColumn('billed').withTitle('Billed'),
                    DTColumnBuilder.newColumn('unbilled').withTitle('Un Billed'),
                  
                    DTColumnBuilder.newColumn(null).withTitle('View Details').notSortable()
                    .renderWith(distHtml)                
                    ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }



      let distHtml = (data) => {
            return `<a class="btn btn-xs btn-success" ui-sref="app.disbtlist({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>Disbursments</a>`
        }
 
  let total = this.API.service('total', this.API.all('disbs'))
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
                    DTColumnBuilder.newColumn('total').withTitle('').withOption('width', '40%'),
                    DTColumnBuilder.newColumn('tcost').withTitle('Total Disbursments'),
                    DTColumnBuilder.newColumn('billed').withTitle('Billed'),
                    DTColumnBuilder.newColumn('unbilled').withTitle('Un Billed'),
                    
                     ]

                this.displayTable2 = true
            })



    }




    $onInit () {}
}

export const DisbListComponent = {
    templateUrl: './views/app/components/disb-list/disb-list.component.html',
    controller: DisbListController,
    controllerAs: 'vm',
    bindings: {}
}
