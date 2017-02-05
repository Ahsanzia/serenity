import {StakeAddComponent} from './app/components/stake-add/stake-add.component';
import {MyDateComponent} from './app/components/my-date/my-date.component';
import {CostListComponent} from './app/components/cost-list/cost-list.component';
import {CostEditComponent} from './app/components/cost-edit/cost-edit.component';
import {CostAddComponent} from './app/components/cost-add/cost-add.component';
import {PendingCompleteComponent} from './app/components/pending-complete/pending-complete.component';
import {TaskEditComponent} from './app/components/task-edit/task-edit.component';
import {TaskAddComponent} from './app/components/task-add/task-add.component';
import {TaskListComponent} from './app/components/task-list/task-list.component';
import {DirectorAddComponent} from './app/components/director-add/director-add.component';
import {StakeholderListComponent} from './app/components/stakeholder-list/stakeholder-list.component';
import {DirectorListComponent} from './app/components/director-list/director-list.component';
import {CompanieDetailComponent} from './app/components/companie-detail/companie-detail.component';
import {CompanieEditComponent} from './app/components/companie-edit/companie-edit.component';
import {CompanieAddComponent} from './app/components/companie-add/companie-add.component';
import {CompanieListComponent} from './app/components/companie-list/companie-list.component';
import {ClientEditComponent} from './app/components/client-edit/client-edit.component';
import {ClientAddComponent} from './app/components/client-add/client-add.component';
import {ClientListsComponent} from './app/components/client-lists/client-lists.component';
import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
import { WidgetsComponent } from './app/components/widgets/widgets.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'

angular.module('app.components')
	.component('stakeAdd', StakeAddComponent)
	.component('myDate', MyDateComponent)
	.component('costList', CostListComponent)
	.component('costEdit', CostEditComponent)
	.component('costAdd', CostAddComponent)
	.component('pendingComplete', PendingCompleteComponent)
	.component('taskEdit', TaskEditComponent)
	.component('taskAdd', TaskAddComponent)
	.component('taskList', TaskListComponent)
	.component('directorAdd', DirectorAddComponent)
	.component('stakeholderList', StakeholderListComponent)
	.component('directorList', DirectorListComponent)
	.component('companieDetail', CompanieDetailComponent)
	.component('companieEdit', CompanieEditComponent)
	.component('companieAdd', CompanieAddComponent)
	.component('companieList', CompanieListComponent)
	.component('clientEdit', ClientEditComponent)
	.component('clientAdd', ClientAddComponent)
	.component('clientLists', ClientListsComponent)
  .component('tablesSimple', TablesSimpleComponent)
  .component('uiModal', UiModalComponent)
  .component('uiTimeline', UiTimelineComponent)
  .component('uiButtons', UiButtonsComponent)
  .component('uiIcons', UiIconsComponent)
  .component('uiGeneral', UiGeneralComponent)
  .component('formsGeneral', FormsGeneralComponent)
  .component('chartsChartjs', ChartsChartjsComponent)
  .component('widgets', WidgetsComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('comingSoon', ComingSoonComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
