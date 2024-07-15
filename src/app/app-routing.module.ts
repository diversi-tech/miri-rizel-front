import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './components/worker-component/worker-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthCodeGuard } from './Guard/auth-code.guard';
import { LoginComponent } from './components/login/login.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddLeadComponent } from './components/Lead-components/add-lead/add-lead.component';
import { ListLeadsComponent } from './components/Lead-components/list-leads/list-leads.component';
import { LeadComponent } from './components/Lead-components/lead/lead.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { EditLeadComponent } from './components/Lead-components/edit-lead/edit-lead.component';
// import { DocumentComponent } from './components/documens/document/document.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ListDocumentComponent } from './components/documens/list-document/list-document.component';
import { AuthGuard } from './Guard/auth.guard';
const routes: Routes = [
  // { path: 'customer', component: CustomersComponent, canActivate: [AuthGuard], data: { roles: [3, 2, 1] } },
  { path: 'worker', component: WorkerComponentComponent, canActivate: [AuthGuard], data: { roles: [2, 1] } },
  { path: 'admin', component: AdminComponentComponent, canActivate: [AuthGuard], data: { roles: [1] } },
  { path: 'customer', component: CustomersComponent},
  { path: 'worker', component: WorkerComponentComponent },
  { path: 'admin', component: AdminComponentComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'add-task/:id', component: AddTaskComponent },
  { path: 'project', component: ProjectTableComponent },
  { path: 'projectTable', component: ProjectTableComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'home/:role', component: HomePageComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-task/:id', component: AddTaskComponent },
  { path: 'addLead', component: AddLeadComponent },
  { path: 'editLead', component: EditLeadComponent },
  // { path: '', redirectTo: '/add-task', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'addLead', component: AddLeadComponent},
  {path: 'editLead', component: EditLeadComponent},
  {path: 'documents', component: ListDocumentComponent},

  {
    path: 'leads',
    component: ListLeadsComponent,
    children: [{ path: '', component: LeadComponent }],
  },

  { path: 'task', component: TaskBoardComponent },
  {
    path: 'ResetPassword',
    component: ResetPasswordComponent,
    canActivate: [AuthCodeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
