class ClientListsController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let clients = this.API.service('clients')

        clients.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('fname').withTitle('First Name'),
                    DTColumnBuilder.newColumn('lname').withTitle('Last Name'),
                    DTColumnBuilder.newColumn('drivinglicence').withTitle('Driving Licence'),
                    DTColumnBuilder.newColumn('idcard').withTitle('ID Card'),
                    DTColumnBuilder.newColumn('passport').withTitle('Passport'),
                    DTColumnBuilder.newColumn('dob').withTitle('Date Of Birth'),
                    DTColumnBuilder.newColumn(null).withTitle('View Cases').notSortable().renderWith(actionsHtml2),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }


        let actionsHtml2 = (data) => {
            return `
            <a class="btn btn-xs btn-primary" ui-sref="app.clientcaselist({caseId: ${data.id}})">
                    <i class="fa fa-edit">view cases</i>
                </a>
                `
        }

        let actionsHtml = (data) => {
            return `
                <a class="btn btn-xs btn-warning" ui-sref="app.clientedit({clientId: ${data.id}})">
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
            API.one('clients').one('client', roleId).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Client has been deleted.',
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

export const ClientListsComponent = {
    templateUrl: './views/app/components/client-lists/client-lists.component.html',
    controller: ClientListsController,
    controllerAs: 'vm',
    bindings: {}
}
