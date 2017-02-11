class DisbtotalListController{
  constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('company', this.API.all('disbs'))
               
        
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
                    DTColumnBuilder.newColumn('ddetail').withTitle('Detail'),
                    DTColumnBuilder.newColumn('ddate').withTitle('Date'),
                    DTColumnBuilder.newColumn('tcost').withTitle('Total Disbursments'),
                    DTColumnBuilder.newColumn('billed').withTitle('Billed'),
                    DTColumnBuilder.newColumn(null).withTitle('Un Billed').notSortable()
                        .renderWith(distHtml),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }


        let distHtml = (data) => {
            let dataunbilled = data.tcost*1-data.billed*1
            return dataunbilled
        }
     
        let actionsHtml = (data) => {
            return `
                <a class="btn btn-xs btn-warning" ui-sref="app.disbedit({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }


 let total = this.API.service('totalfull', this.API.all('disbs'))
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

    delete (roleId) {
        let API = this.API
        let $state = this.$state

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            API.one('companies').one('companie', roleId).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Company has been deleted.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function () {
                        $state.reload()
                    })
                })
        })
    }

    $onInit () {}
}

export const DisbtotalListComponent = {
    templateUrl: './views/app/components/disbtotal-list/disbtotal-list.component.html',
    controller: DisbtotalListController,
    controllerAs: 'vm',
    bindings: {}
}
