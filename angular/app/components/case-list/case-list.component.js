class CaseListController{
     constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('companies')
        
        
        
        var qParams = [];
        qParams['c_type'] = 2
        
        clients.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('name').withTitle('Name'),
                    DTColumnBuilder.newColumn('regno').withTitle('Reference'),
                    DTColumnBuilder.newColumn('casetype').withTitle('Case Type'),
                    DTColumnBuilder.newColumn('appdate').withTitle('Appointment Date'),
                    DTColumnBuilder.newColumn(null).withTitle('Add Task').notSortable()
                        .renderWith(taskHtml),    
                    DTColumnBuilder.newColumn(null).withTitle('Add Details').notSortable()
                    .renderWith(detailsHtml),
                    DTColumnBuilder.newColumn(null).withTitle('Add Disbursments').notSortable()
                    .renderWith(distHtml),
                    DTColumnBuilder.newColumn(null).withTitle('TCA Summary').notSortable()
                    .renderWith(tcaHtml),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

       let distHtml = (data) => {
            return `<a class="btn btn-xs btn-warning" ui-sref="app.disbadd({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>Disbursments</a>`
        }
        let tcaHtml = (data) => {
            return `<a class="btn btn-xs btn-success" ui-sref="app.summaryfull({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>View Summary</a>`
        }

        let taskHtml = (data) => {
            return `<a class="btn btn-xs btn-danger" ui-sref="app.taskadd({companyId: ${data.id}})">
                    <i class="fa fa-edit"></i>Add Task</a>`
        }
        let detailsHtml = (data) => {
            return `<a class="btn btn-xs btn-primary" ui-sref="app.companydetails({companyId: ${data.id}})">
                    <i class="fa fa-edit">View/Add Details</i></a>`
        }
        let actionsHtml = (data) => {
            return `
                <a class="btn btn-xs btn-warning" ui-sref="app.companyedit({companyId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }

    delete (roleId) {
        let API = this.API
        let $state = this.$state

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            API.one('companies').one('companie', roleId).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Company has been deleted.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function () {
                        $state.reload()
                    })
                })
        })
    }

    $onInit () {}

}

export const CaseListComponent = {
    templateUrl: './views/app/components/case-list/case-list.component.html',
    controller: CaseListController,
    controllerAs: 'vm',
    bindings: {}
}
