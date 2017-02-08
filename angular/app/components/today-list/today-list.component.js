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
                    DTColumnBuilder.newColumn(null).withTitle('Status').notSortable()
                        .renderWith(actionsHtml2), 
                    DTColumnBuilder.newColumn('narration').withTitle('Narration'),
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Reminder Date'),
                    DTColumnBuilder.newColumn('name').withTitle('Case Name'),
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
                    DTColumnBuilder.newColumn(null).withTitle('Status').notSortable()
                        .renderWith(actionsHtml2), 
                    DTColumnBuilder.newColumn('narration').withTitle('Narration'),
                    DTColumnBuilder.newColumn('reminder_date').withTitle('Reminder Date'),
                    DTColumnBuilder.newColumn('name').withTitle('Case Name'),
                      DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                          
                ]

                this.displayTable2 = true
            })


        let actionsHtml2 = (data) => {
         if (data.is_done==1)
         {
            return `
              <a class="btn btn-xs btn-success">
                    <i class="fa">Completed</i>
                </a>`
            
         }else{
            return `
              <a class="btn btn-xs btn-danger">
                    <i class="fa">Pending</i>
                </a>`
            
         }
        }

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
            return `
               <a class="btn btn-xs btn-warning" ui-sref="app.taskedit({clientId: ${data.id}})">
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
