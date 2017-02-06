class TodayListController{
  constructor($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let taskpt =  API.all('taskpt')
        //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        taskpt.getList()
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


           let taskct =  API.all('taskct')
        //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        taskct.getList()
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
}

export const TodayListComponent = {
    templateUrl: './views/app/components/today-list/today-list.component.html',
    controller: TodayListController,
    controllerAs: 'vm',
    bindings: {}
}
