import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from '@app/Components/worker-component/worker-component.component';
// import { AdminComponentComponent } from '@app/Components/admin-component/admin-component.component';
import { CustomersComponent } from '@app/Components/customers/customers.component';
import { HomeComponent } from '@app/Components/home/home.component';
import { ResetPasswordComponent } from '@app/Components/reset-password/reset-password.component';
import { AuthCodeGuard } from '@app/Guard/auth-code.guard';
import { LoginComponent } from '@app/Components/login/login.component';
import { EditUserComponent } from '@app/Components/edit-user/edit-user.component';
import { AddUserComponent } from '@app/Components/add-user/add-user.component';
import { AddLeadComponent } from '@app/Components/Lead-components/add-lead/add-lead.component';
import { ListLeadsComponent } from '@app/Components/Lead-components/list-leads/list-leads.component';
import { LeadComponent } from '@app/Components/Lead-components/lead/lead.component';
import { SignUpComponent } from '@app/Components/sign-up/sign-up.component';
import { AddTaskComponent } from '@app/Components/add-task/add-task.component';
import { AddProjectComponent } from '@app/Components/add-project/add-project.component';
import { ProjectTableComponent } from '@app/Components/project-table/project-table.component';
import { EditLeadComponent } from '@app/Components/Lead-components/edit-lead/edit-lead.component';
import { DocumentComponent } from '@app/Components/documens/document/document.component';
import { TaskBoardComponent } from '@app/Components/task-board/task-board.component';
import { HomePageComponent } from '@app/Components/home-page/home-page.component';
import { CustomerProfileComponent } from '@app/Components/customer-profile/customer-profile.component';
import { ListDocumentComponent } from '@app/Components/documens/list-document/list-document.component';
import { AuthGuard } from '@app/Guard/auth.guard';
import { AdminComponent } from '@app/Components/admin/admin.component';
import { PropilComponent } from '@app/Components/propil/propil.component';
import { PropilListComponent } from '@app/Components/propil-list/propil-list.component';
import { error404Component } from '@app/Components/errors/error-404.component';
import { UploadFilseComponent } from '@app/Components/upload-filse/upload-filse.component';
import { UsersComponent } from '@app/Components/users/users.component';
import { CustomersDashboardComponent } from '@app/Components/customers-dashboard/customers-dashboard.component';
import { NoAuthGuard } from './Guard/noAuth.guard';
import { error403Component } from './Components/errors/error-403.component';
import { RoleBasedGuard } from './Guard/role-based.guard';
import { PlaceholderComponent } from './Components/Placeholder/Placeholder.component';
import { CodeGuard } from './Guard/code.guard';
const routes: Routes = [
  // 1=customer, 2=worker, 3=admin
  { path: '', pathMatch: 'full', redirectTo: 'redirect' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], data: { roles: [2, 3] } },
  { path: 'redirect', canActivate: [RoleBasedGuard], component: PlaceholderComponent },
  { path: 'Dashboard', component: CustomersDashboardComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
  
  { path: 'worker', component: WorkerComponentComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'edit', component: EditUserComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'add', component: AddUserComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'task', component: TaskBoardComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'addProject', component: AddProjectComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'add-task/:id', component: AddTaskComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'project', component: ProjectTableComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'projectTable', component: ProjectTableComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'customer-profile', component: CustomerProfileComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  { path: 'addLead', component: AddLeadComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'editLead', component: EditLeadComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'leads', component: ListLeadsComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  { path: 'documentation', component: PropilListComponent, canActivate: [AuthGuard], data: { roles: [3, 2] } },
  // { path: 'customer', component: CustomersComponent },
  // { path: 'worker', component: WorkerComponentComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: [3] } },
  // { path: 'admin', component: AdminComponent },
  // { path: 'edit', component: EditUserComponent },
  // { path: 'add', component: AddUserComponent },
  { path: 'sign-up', component: SignUpComponent },
  // { path: 'task', component: TaskBoardComponent },
  // { path: 'addProject', component: AddProjectComponent },
  // { path: 'add-task/:id', component: AddTaskComponent },
  // { path: 'project', component: ProjectTableComponent },
  // { path: 'projectTable', component: ProjectTableComponent },
  { path: 'signUp', component: SignUpComponent },
  // { path: 'customer-profile', component: CustomerProfileComponent },
  // { path: 'add-task', component: AddTaskComponent },
  // { path: 'add-task/:id', component: AddTaskComponent },
  // { path: 'addLead', component: AddLeadComponent },
  // { path: 'editLead', component: EditLeadComponent },
  { path: 'documents', component: ListDocumentComponent  ,canActivate: [AuthGuard], data: { roles: [3, 2] } },
  // { path: 'leads', component: ListLeadsComponent },
  // { path: 'Dashboard', component: CustomersDashboardComponent },
  // { path: 'documentation', component: PropilListComponent },
  // { path: 'chat', component: ChatComponent },
  {
    path: 'leads',
    component: ListLeadsComponent,
    children: [{ path: '', component: LeadComponent }],
  },
  // {
  //   path: 'ResetPassword',
  //   component: ResetPasswordComponent,
  //   canActivate: [AuthCodeGuard],
  // },
  {
    path: 'ResetPassword',
    component: ResetPasswordComponent,
    canActivate: [CodeGuard],
  },
  { path: '403-not-found', pathMatch: 'full', component: error403Component },
  { path: '404-not-found', pathMatch: 'full', component: error404Component },
  { path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
