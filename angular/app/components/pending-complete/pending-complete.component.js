class PendingCompleteController{
    constructor($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let taskp =  API.all('taskp')
        //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        this.companyId=$stateParams.companyId
        var qParams = [];
        qParams['id'] = $stateParams.companyId
        taskp.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()
                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()
                this.dtColumns = [
                    DTColumnBuilder.newColumn('narration').withTitle('Narration'),
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Reminder Date'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })


      



        //HERE


           let taskc =  API.all('taskc')
        //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        qParams['id'] = $stateParams.companyId
        taskc.getList(qParams)
            .then((response) => {
                let dataSet2 = response.plain()
                this.dtOptions2 = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet2)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()
                this.dtColumns2 = [
                    DTColumnBuilder.newColumn('narration').withTitle('Narration'),
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Reminder Date'),
       DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                          
                ]

                this.displayTable2 = true
            })


        

         let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }
        let actionsHtml = (data) => {
            return `
               <a class="btn btn-xs btn-success" ui-sref="app.taskedit({clientId: ${data.id}})">
                    <i class="fa">Edit Task</i>
                </a>`
        }



    }

    $onInit(){
    }
}

export const PendingCompleteComponent = {
    templateUrl: './views/app/components/pending-complete/pending-complete.component.html',
    controller: PendingCompleteController,
    controllerAs: 'vm',
    bindings: {}
}
