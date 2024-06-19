import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './components/worker-component/worker-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { CustomerComponentComponent } from './components/customer-component/customer-component.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthCodeGuard } from './components/auth-code-dialog/auth-code.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'worker', component: WorkerComponentComponent },
  { path: 'admin', component: AdminComponentComponent },
  { path: 'customer', component: CustomerComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
