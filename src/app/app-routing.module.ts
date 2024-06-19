import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthCodeGuard } from './components/auth-code-dialog/auth-code.guard';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'LogIn', component: LogInComponent },
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
