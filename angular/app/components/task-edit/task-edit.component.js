class TaskEditController{
    constructor ($stateParams, $state, API) {
        'ngInject'

        this.$state = $state
        this.formSubmitted = false
        this.alerts = []

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts)
        }

        let clientId = $stateParams.clientId
        

        let task = API.service('task-show', API.all('tasks'))
        task.one(clientId).get()
            .then((response) => {
                this.task = API.copy(response)
                this.clientId=this.task.data.companiesid
                if(this.task.data.is_done  == 1){
                this.task.data.is_done = true;         
                }else{
                this.task.data.is_done = false;             
                }
            })

    }


    save (isValid) {
        if (isValid) {
            let $state = this.$state
            this.task.put()
                .then(() => {
                    let alert = { type: 'success', 'title': 'Success!', msg: 'Task has been updated.' }
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

export const TaskEditComponent = {
    templateUrl: './views/app/components/task-edit/task-edit.component.html',
    controller: TaskEditController,
    controllerAs: 'vm',
    bindings: {}
}
