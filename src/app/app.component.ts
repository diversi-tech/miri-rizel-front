import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { AccessibilityComponent } from "./Components/accessibility/accessibility.component";
import { CustomersDashboardComponent } from './Components/customers-dashboard/customers-dashboard.component';
import { AuthService } from './Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgxSpinnerModule, NavComponent, RouterOutlet, AccessibilityComponent,CustomersDashboardComponent,NgIf]
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
    if (currentRoute === '/login'||currentRoute === '/signUp') {
      this.shouldShowNav = false;
    } 
    // תנאי לפי הרשאות
    else if (userRole ===1) {
      this.shouldShowNav = false;
    } 
    else {
      this.shouldShowNav = true;
    }
  }
}
