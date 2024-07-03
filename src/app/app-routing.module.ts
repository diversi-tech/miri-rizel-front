import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './Components/worker-component/worker-component.component';
import { AdminComponentComponent } from './Components/admin-component/admin-component.component';
import { CustomersComponent} from './Components/customers/customers.component';
import { HomeComponent } from './Components/home/home.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthCodeGuard } from './Components/auth-code-dialog/auth-code.guard';
import { LoginComponent } from './Components/login/login.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { GoogleComponent } from './Components/google/google.component';
import { AddLeadComponent } from './Components/Lead-components/add-lead/add-lead.component';
import { ListLeadsComponent } from './Components/Lead-components/list-leads/list-leads.component';
import { LeadComponent } from './Components/Lead-components/lead/lead.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { DocumentComponent } from './Components/document/document.component';
// import { TaskBoardComponent } from './Components/task-board/task-board.component';




const routes: Routes = [
  { path: 'worker', component: WorkerComponentComponent },
  { path: 'admin', component: AdminComponentComponent },
  { path: 'customer', component: CustomersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path: 'addLead', component: AddLeadComponent},
  {path: 'document', component: DocumentComponent},

  {
    path: 'leads',
    component: ListLeadsComponent,
    children: [{ path: '', component: LeadComponent }],
  },
  { path: '', component: LoginComponent },
  // { path: 'task', component: TaskBoardComponent },
  { path: '', redirectTo: '/task', pathMatch: 'full' },
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
export class AppRoutingModule {}
