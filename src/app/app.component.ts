import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet ,RouterModule} from '@angular/router';
import { NavComponent } from '@app/Components/nav/nav.component';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { AccessibilityComponent } from "@app/Components/accessibility/accessibility.component";
import { CustomersDashboardComponent } from '@app/Components/customers-dashboard/customers-dashboard.component';
import { AuthService } from '@app/Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgxSpinnerModule, NavComponent, RouterOutlet,RouterModule, AccessibilityComponent,CustomersDashboardComponent,NgIf]
})
export class AppComponent {
  value:any
  title = 'copyRight';
  shouldShowNav:boolean = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavVisibility();
      }
    });
  }

  ngOnInit() {
    this.updateNavVisibility();
  }

  updateNavVisibility() {
    const currentRoute = this.router.url;
    const userRole = this.authService.getRole();
    
    // תנאי למסך הלוגין
    // if (currentRoute === '/Dashboard') {
   //   this.shouldShowNav = false;
    // } 
    // תנאי לפי הרשאות
    // else if (userRole ===1) {
    //   this.shouldShowNav = false;
    // } 
    // else {
      this.shouldShowNav = true;
    //}
  }
}
