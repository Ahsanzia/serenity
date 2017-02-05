class DirectorListController {
    constructor($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

       let clients =  API.all('companyclients')
      //  let clients = API.service('client', API.all('companyclients'))
        //  let Roles = this.API.service('clients', this.API.all('companyclients'))

        this.companyId=$stateParams.companyId
        var qParams = [];
        qParams['id'] = $stateParams.companyId
        qParams['type'] = 1
        clients.getList(qParams)
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
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml = (data) => {
            return `
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }



        qParams = [];
        qParams['id'] = $stateParams.companyId
        qParams['type'] = 2
        clients.getList(qParams)
            .then((response) => {
                let dataSet = response.plain()
                this.dtOptions2 = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()
                this.dtColumns2 = [
                    DTColumnBuilder.newColumn('fname').withTitle('First Name'),
                    DTColumnBuilder.newColumn('lname').withTitle('Last Name'),

                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml2)
                ]
                this.displayTable2 = true
            })
        let actionsHtml2 = (data) => {
            return `
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }


        //HERE


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
            API.one('deleteCompanyclient', roleId).remove()
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


    $onInit() {
    }
}

export const DirectorListComponent = {
    templateUrl: './views/app/components/director-list/director-list.component.html',
    controller: DirectorListController,
    controllerAs: 'vm',
    bindings: {}
}
