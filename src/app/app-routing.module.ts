import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './Components/worker-component/worker-component.component';
import { AdminComponentComponent } from './Components/admin-component/admin-component.component';
import { CustomerComponentComponent } from './Components/customer-component/customer-component.component';
import { HomeComponent } from './Components/home/home.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthCodeGuard } from './Guards/auth-code.guard';
import { LoginComponent } from './Components/login/login.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { GoogleComponent } from './Components/google/google.component';
import { AddLeadComponent } from './Components/Lead-components/add-lead/add-lead.component';
import { ListLeadsComponent } from './Components/Lead-components/list-leads/list-leads.component';
import { LeadComponent } from './Components/Lead-components/lead/lead.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { TaskBoardComponent } from './Components/task-board/task-board.component';
import { EditLeadComponent } from './Components/Lead-components/edit-lead/edit-lead.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: 'customer', component: CustomerComponentComponent, canActivate: [AuthGuard], data: { roles: [3, 2, 1] } },
  { path: 'worker', component: WorkerComponentComponent, canActivate: [AuthGuard], data: { roles: [2, 1] } },
  { path: 'admin', component: AdminComponentComponent, canActivate: [AuthGuard], data: { roles: [1] } },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'task-board', component: TaskBoardComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-task/:id', component: AddTaskComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'addLead', component: AddLeadComponent },
  { path: 'editLead', component: EditLeadComponent },
  {
    path: 'leads',
    component: ListLeadsComponent,
    children: [{ path: '', component: LeadComponent }],
  },
  { path: '', component: ListLeadsComponent },
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
