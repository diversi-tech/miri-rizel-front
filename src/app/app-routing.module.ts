import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponentComponent } from './components/log-in-component/log-in-component.component';
import { WorkerComponentComponent } from './components/worker-component/worker-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { CustomerComponentComponent } from './components/customer-component/customer-component.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {path: '',component:LogInComponentComponent},
  {path: 'worker',component:WorkerComponentComponent},
  {path: 'admin',component:AdminComponentComponent},
  {path: 'customer',component:CustomerComponentComponent},
  {path: 'add',component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
