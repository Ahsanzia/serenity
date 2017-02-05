class StakeAddController{
     constructor ($stateParams,$scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject'
        this.API = API
        this.$state = $state
        this.$stateParams = $stateParams
        let clients = this.API.service('clients')
        this.companyId=$stateParams.companyId
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
                <button class="btn btn-xs btn-success" ng-click="vm.adddirector(${data.id})">
                    <i class="fa">Add Stakeholder</i>
                </button>`
        }
    }

    adddirector (userid) {
        let API = this.API
        let $state = this.$state
        let $stateParams= this.$stateParams
        swal({
            title: 'Are you sure?',
            text: 'You want to add this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5cb85c',
            confirmButtonText: 'Yes, Add it!',
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            let clients = API.service('companyclient', API.all('companies'))
            clients.post({
                'companyid': $stateParams.companyId,
                'clientid': userid,
                'type' : 2
            }).then(() => {
                    swal({
                        title: 'Added!',
                        text: 'Stakeholder has been Added.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        closeOnConfirm: true
                    }, function () {
                        $state.reload()
                    })
                })
        })
    }

    $onInit(){
    }
}

export const StakeAddComponent = {
    templateUrl: './views/app/components/stake-add/stake-add.component.html',
    controller: StakeAddController,
    controllerAs: 'vm',
    bindings: {}
}
