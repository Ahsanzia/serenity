class CompanieEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let clientId = $stateParams.companyId


        let client = API.service('company-show', API.all('companies'))
        client.one(clientId).get()
            .then((response) => {
                this.company = API.copy(response)
            })

    }


    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.client.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Client has been updated.' }
                    $state.go($state.current, { alerts: alert})
                }, (response) => {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert})
                })
        } else {
            this.formSubmitted = true
        }
    }

    $onInit () {}
}

export const CompanieEditComponent = {
    templateUrl: './views/app/components/companie-edit/companie-edit.component.html',
    controller: CompanieEditController,
    controllerAs: 'vm',
    bindings: {}
}
