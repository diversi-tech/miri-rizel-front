import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './Components/worker-component/worker-component.component';
import { AdminComponentComponent } from './Components/admin-component/admin-component.component';
import { CustomerComponentComponent } from './Components/customer-component/customer-component.component';
import { HomeComponent } from './Components/home/home.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AuthCodeGuard } from './Components/auth-code-dialog/auth-code.guard';
import { LoginComponent } from './Components/login/login.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { GoogleComponent } from './Components/google/google.component';

const routes: Routes = [
  { path: 'worker', component: WorkerComponentComponent },
  { path: 'admin', component: AdminComponentComponent },
  { path: 'customer', component: CustomerComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: '', component: LoginComponent },
  // { path: '', redirectTo: 'google', pathMatch: 'full' },
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
