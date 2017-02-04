class CompanieAddController{
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
            let clients = this.API.service('profile', this.API.all('companies'))
            let $state = this.$state
            clients.post({
                'name': this.name,
                'regno': this.regno,
                'casetype': this.casetype,
                'appdate': this.appdate,


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

export const CompanieAddComponent = {
    templateUrl: './views/app/components/companie-add/companie-add.component.html',
    controller: CompanieAddController,
    controllerAs: 'vm',
    bindings: {}
}
