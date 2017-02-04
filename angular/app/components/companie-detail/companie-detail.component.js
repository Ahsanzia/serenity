class CompanieDetailController{
    constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clientId = $stateParams.companyId
       // let client = API.service('company-show', API.all('companies'))
        let client = this.API.service('companies')
        client.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('name').withTitle('Company Name'),
                    DTColumnBuilder.newColumn('regno').withTitle('Registration-No'),
                    DTColumnBuilder.newColumn('casetype').withTitle('Case Type'),
                    DTColumnBuilder.newColumn('appdate').withTitle('Appointment Date'),
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
            return `
                <a class="btn btn-xs btn-warning" ui-sref="app.userrolesedit({roleId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }

    $onInit () {}
}

export const CompanieDetailComponent = {
    templateUrl: './views/app/components/companie-detail/companie-detail.component.html',
    controller: CompanieDetailController,
    controllerAs: 'vm',
    bindings: {}
}
