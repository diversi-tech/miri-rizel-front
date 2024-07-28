import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomersDashboardComponent } from './Components/customers-dashboard/customers-dashboard.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgxSpinnerModule,NavComponent, RouterOutlet,CustomersDashboardComponent]
})
export class AppComponent {
  value:any
  title = 'copyRight';
}
