import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponentComponent } from './components/worker-component/worker-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { CustomerComponentComponent } from './components/customer-component/customer-component.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'worker',component:WorkerComponentComponent},
  {path: 'admin',component:AdminComponentComponent},
  {path: 'customer',component:CustomerComponentComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // לדוגמה, אם רוצים להפנות לדף הכניסה כברירת מחדל
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
