class CompanieListController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('companies')

        clients.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('name').withTitle('Company Name'),
                    DTColumnBuilder.newColumn('regno').withTitle('Registration-No'),
                    DTColumnBuilder.newColumn('casetype').withTitle('Case Type'),
                    DTColumnBuilder.newColumn('appdate').withTitle('Appointment Date'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
            return `<a class="btn btn-xs btn-success" ui-sref="app.companydetails({companyId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <a class="btn btn-xs btn-primary" ui-sref="app.taskadd({companyId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
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
            API.one('companies').one('Company', roleId).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Company Role has been deleted.',
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

export const CompanieListComponent = {
    templateUrl: './views/app/components/companie-list/companie-list.component.html',
    controller: CompanieListController,
    controllerAs: 'vm',
    bindings: {}
}
