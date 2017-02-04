class ClientEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let clientId = $stateParams.clientId


        let client = API.service('client-show', API.all('clients'))
        client.one(clientId).get()
            .then((response) => {
                this.client = API.copy(response)
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

export const ClientEditComponent = {
    templateUrl: './views/app/components/client-edit/client-edit.component.html',
    controller: ClientEditController,
    controllerAs: 'vm',
    bindings: {}
}
