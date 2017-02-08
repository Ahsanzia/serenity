class CaseDetailController{
    constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clientId = $stateParams.companyId
       
        let company = API.service('company-show', API.all('companies'))
        company.one(clientId).get()
            .then((response) => {
                this.company = API.copy(response)
                this.company.data.appdate =  new Date(this.company.data.appdate)

            })
        }

    $onInit () {}
}

export const CaseDetailComponent = {
    templateUrl: './views/app/components/case-detail/case-detail.component.html',
    controller: CaseDetailController,
    controllerAs: 'vm',
    bindings: {}
}
