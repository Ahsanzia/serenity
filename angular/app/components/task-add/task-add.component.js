class TaskAddController{
    constructor (API, $state, $stateParams) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.API = API
        this.alerts = []
        this.$stateParams=$stateParams
        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

    }

    save (isValid) {
        this.$state.go(this.$state.current, {}, { alerts: 'test' })
        if (isValid) {
            let clients = this.API.service('profile', this.API.all('tasks'))
            let $state = this.$state
            clients.post({
                'narration': this.narration,
                'reminder_date': this.reminder_date,
                'companiesid': this.$stateParams.companyId
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

export const TaskAddComponent = {
    templateUrl: './views/app/components/task-add/task-add.component.html',
    controller: TaskAddController,
    controllerAs: 'vm',
    bindings: {}
}
