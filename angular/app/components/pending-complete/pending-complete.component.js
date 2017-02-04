class PendingCompleteController{
    constructor($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let taskp =  API.all('taskp')
        //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        this.companyId=$stateParams.companyId
        var qParams = [];
        qParams['id'] = "%"

        taskp.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml2)
                ]

                this.displayTable = true
            })



        let actionsHtml2 = (data) => {
            return `
                <button class="btn btn-xs btn-success" ng-click="vm.adddirector(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
        let taskc =  API.all('taskc')
        var qParams = [];
        qParams['id'] = "%"

        taskc.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
            return `
                <button class="btn btn-xs btn-success" ng-click="vm.adddirector(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }



        //HERE


    }

    $onInit(){
    }
}

export const PendingCompleteComponent = {
    templateUrl: './views/app/components/pending-complete/pending-complete.component.html',
    controller: PendingCompleteController,
    controllerAs: 'vm',
    bindings: {}
}
