import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
// role: string = ""
  // ngOnInit() {
  //   this.role = this.route.snapshot.paramMap.get('role')!;
  //   console.log('המספר שהתקבל בניתוב:', this.role);
  //   this.isAdmin = this.checkIfAdmin(this.role);
  //   console.log('isAdmin:', this.isAdmin);
  // }
  // checkIfAdmin(role: any): boolean {
  //   return role === '1' || role === '2';
  // }

  // navigateTo(route: string): void {
  //   this.router.navigate([route]);
  // }
}
