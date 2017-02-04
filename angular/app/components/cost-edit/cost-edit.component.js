class CostEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
        let caseId = $stateParams.caseId
        let CaseData =  API.service('case')
        CaseData.one(caseId).get()
            .then((response) => {
                this.cases = API.copy(response)
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.cases.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Case has been updated.' }
                    $state.go($state.current, { alerts: alert})
                }, (response) => {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
        } else {
            this.formSubmitted = true
        }
    }

    $onInit(){
    }
}

export const CostEditComponent = {
    templateUrl: './views/app/components/cost-edit/cost-edit.component.html',
    controller: CostEditController,
    controllerAs: 'vm',
    bindings: {}
}
