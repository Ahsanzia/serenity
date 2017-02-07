class CostAddController{
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
            //    let Roles = this.API.service('case', this.API.all('cases'))
            let Case = this.API.service('profile', this.API.all('costs'))
            let $state = this.$state
            Case.post({
                'director': this.director,
                'manager': this.manager,
                's_admin': this.s_admin,
                'admin': this.admin,
                'asst_admin': this.asst_admin,
                'j_admin': this.j_admin
            }).then(function () {
                let alert = { type: 'success', 'title': 'Success!', msg: 'Cost has been added.' }
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

export const CostAddComponent = {
    templateUrl: './views/app/components/cost-add/cost-add.component.html',
    controller: CostAddController,
    controllerAs: 'vm',
    bindings: {}
}
