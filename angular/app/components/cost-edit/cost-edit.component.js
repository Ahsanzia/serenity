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


        let CaseData = API.service('cost-show', API.all('costs'))
        CaseData.one(caseId).get()
            .then((response) => {
                this.cost = API.copy(response)
                if(this.cost.data.active  == 1){
                    this.cost.data.active = true;         
                }else{
                   this.cost.data.active = false;             
                }
            })
    }

    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.cost.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Cost has been updated.' }
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
