class CostListController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let Cases = this.API.service('cases')

        Cases.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('id').withTitle('ID'),
                    DTColumnBuilder.newColumn('name').withTitle('Case Name'),
                    DTColumnBuilder.newColumn('no').withTitle('Case Number'),
                    DTColumnBuilder.newColumn('created_at').withTitle('Created'),
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
              <a class="btn btn-xs btn-warning" ui-sref="app.caseedit({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                  &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
        }
    }
    delete (caseId) {
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
            API.one('case', caseId).remove()
                .then(() => {
                    swal({
                        title: 'Deleted!',
                        text: 'Case has been deleted.',
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

export const CostListComponent = {
    templateUrl: './views/app/components/cost-list/cost-list.component.html',
    controller: CostListController,
    controllerAs: 'vm',
    bindings: {}
}
