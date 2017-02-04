class ClientAddController{
    constructor (API, $state, $stateParams) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.API = API
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }
    }

    save (isValid) {
        this.$state.go(this.$state.current, {}, { alerts: 'test' })
        if (isValid) {
            let clients = this.API.service('profile', this.API.all('clients'))
            let $state = this.$state
            clients.post({
                'fname': this.fname,
                'mname': this.mname,
                'lname': this.lname,
                'drivinglicence': this.drivinglicence,
                'passport': this.passport,
                'utilitybill': this.utilitybill,
                'dob': this.dob,
                'ninumber': this.ninumber
            }).then(function () {
                let alert = { type: 'success', 'title': 'Success!', msg: 'Client has been added.' }
                $state.go($state.current, { alerts: alert})
            }, function (response) {
                let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                $state.go($state.current, { alerts: alert})
            })
        } else {
            this.formSubmitted = true
        }
    }

    $onInit () {}
}

export const ClientAddComponent = {
    templateUrl: './views/app/components/client-add/client-add.component.html',
    controller: ClientAddController,
    controllerAs: 'vm',
    bindings: {}
}
