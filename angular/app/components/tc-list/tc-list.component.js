class TcListController{
   constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('tcs')

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
                    DTColumnBuilder.newColumn('tunits').withTitle('T Units'),
                    DTColumnBuilder.newColumn('thours').withTitle('T Hours'),
                    DTColumnBuilder.newColumn('tcost').withTitle('Total Time Cost'),
                    DTColumnBuilder.newColumn('capproved').withTitle('Approved'),
                    DTColumnBuilder.newColumn('cbilled').withTitle('Billed'),
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
            return `<a class="btn btn-xs btn-success" ui-sref="app.tctlist({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>Time Cost Detail</a>`
        }
 
  let total = this.API.service('total', this.API.all('tcs'))
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
                    DTColumnBuilder.newColumn('total').withTitle('').withOption('width', '30%'),
                    DTColumnBuilder.newColumn('tunits').withTitle('T Units'),
                    DTColumnBuilder.newColumn('thours').withTitle('T Hours'),
                    DTColumnBuilder.newColumn('tcost').withTitle('Total Time Cost'),
                    DTColumnBuilder.newColumn('capproved').withTitle('Approved'),
                    DTColumnBuilder.newColumn('cbilled').withTitle('Billed'),
                    DTColumnBuilder.newColumn('unbilled').withTitle('Un Billed'),
                    
                     ]

                this.displayTable2 = true
            })



    }




    $onInit () {}
}

export const TcListComponent = {
    templateUrl: './views/app/components/tc-list/tc-list.component.html',
    controller: TcListController,
    controllerAs: 'vm',
    bindings: {}
}
