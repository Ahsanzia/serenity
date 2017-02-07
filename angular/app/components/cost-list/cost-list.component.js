class CostListController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state

        let Cases = this.API.service('costs')

        Cases.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('director').withTitle('Director'),
                    DTColumnBuilder.newColumn('manager').withTitle('Manager'),
                    DTColumnBuilder.newColumn('s_admin').withTitle('S.Admin'),
                    DTColumnBuilder.newColumn('admin').withTitle('Admin'),
                    DTColumnBuilder.newColumn('asst_admin').withTitle('Asst.Admin'),
                    DTColumnBuilder.newColumn('j_admin').withTitle('Junior Admin'),
                    DTColumnBuilder.newColumn(null).withTitle('Active').notSortable()
                        .renderWith(actionsHtml2),
                    
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                        .renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let actionsHtml2 = (data) => {
         if (data.active==1)
         {
            return `
              <a class="btn btn-xs btn-success">
                    <i class="fa">Active</i>
                </a>`
            
         }else{
            return `
              <a class="btn btn-xs btn-danger">
                    <i class="fa">Inactive</i>
                </a>`
            
         }
        }

        let actionsHtml = (data) => {
            return `
              <a class="btn btn-xs btn-warning" ui-sref="app.costedit({caseId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>`
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
