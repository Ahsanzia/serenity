export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('landing')
        }
      }
    })
    .state('app.tablessimple', {
      url: '/tables-simple',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<tables-simple></tables-simple>'
        }
      }
    })
    .state('app.uiicons', {
      url: '/ui-icons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-icons></ui-icons>'
        }
      }
    })
    .state('app.uimodal', {
      url: '/ui-modal',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-modal></ui-modal>'
        }
      }
    })
    .state('app.uitimeline', {
      url: '/ui-timeline',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-timeline></ui-timeline>'
        }
      }
    })
    .state('app.uibuttons', {
      url: '/ui-buttons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-buttons></ui-buttons>'
        }
      }
    })
    .state('app.uigeneral', {
      url: '/ui-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-general></ui-general>'
        }
      }
    })
    .state('app.formsgeneral', {
      url: '/forms-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<forms-general></forms-general>'
        }
      }
    })
    .state('app.chartjs', {
      url: '/charts-chartjs',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<charts-chartjs></charts-chartjs>'
        }
      }
    })
    .state('app.comingsoon', {
      url: '/comingsoon',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<coming-soon></coming-soon>'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    }).state('app.clientlist', {
      url: '/client-lists',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<client-lists></client-lists>'
          }
      }
    }).state('app.clientadd', {
      url: '/client-add',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<client-add></client-add>'
          }
      },
      params: {
          alerts: null
      }
  }).state('app.clientedit', {
      url: '/client-edit/:clientId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<client-edit></client-edit>'
          }
      },
      params: {
          alerts: null,
          clientId: null
      }
  }).state('app.companylist', {
      url: '/company-lists',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<companie-list></companie-list>'
          }
      }
  }).state('app.companyadd', {
      url: '/company-add',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<companie-add></companie-add>'
          }
      },
      params: {
          alerts: null
      }
  }).state('app.companyedit', {
      url: '/company-edit/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<companie-edit></companie-edit>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.caselist', {
      url: '/case-lists',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<case-list></case-list>'
          }
      }
  }).state('app.caseadd', {
      url: '/case-add',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<case-add></case-add>'
          }
      },
      params: {
          alerts: null
      }
  }).state('app.caseedit', {
      url: '/case-edit/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<case-edit></case-edit>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.companydetails', {
      url: '/company-detail/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<companie-detail></companie-detail><director-list></director-list><pending-complete></pending-complete>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.casedetails', {
      url: '/case-detail/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<case-detail></case-detail><person-list></person-list><pending-complete></pending-complete>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  })
  .state('app.directoradd', {
      url: '/director-add/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<director-add></director-add>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.stakeadd', {
      url: '/stake-add/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<stake-add></director-add>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.pendingcomplete', {
      url: '/pending-complete/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<pending-complete></pending-complete>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.tasklist', {
      url: '/task-lists/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<task-list></task-list>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.taskadd', {
      url: '/task-add/:companyId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<task-add></task-add>'
          }
      },
      params: {
          alerts: null,
          companyId: null
      }
  }).state('app.taskedit', {
      url: '/task-edit/:clientId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<task-edit></task-edit>'
          }
      },
      params: {
          alerts: null,
          clientId: null
      }
  }) .state('app.costlist', {
      url: '/cost-list',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<cost-list></cost-list>'
          }
      }
  }).state('app.costadd', {
      url: '/cost-add',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<cost-add></cost-add>'
          }
      },
      params: {
          alerts: null
      }
  }).state('app.costedit', {
      url: '/cost-edit/:caseId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<cost-edit></cost-edit>'
          }
      },
      params: {
          alerts: null,
          caseId: null
      }
  }).state('app.summaryfull', {
      url: '/summaryfull-list/:caseId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<summaryfull-list></summaryfull-list>'
          }
      },
      params: {
          alerts: null,
          caseId: null
      }
  }).state('app.clientcaselist', {
      url: '/totalcase-list/:caseId',
      data: {
          auth: true
      },
      views: {
          'main@app': {
              template: '<totalcase-list></totalcase-list>'
          }
      },
      params: {
          alerts: null,
          caseId: null
      }
  }).state('app.todaylist', {
      url: '/today-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<today-list></user-list>'
        }
      }
    }).state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
}
