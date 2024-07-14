
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class HomePageComponent implements OnInit {
  isAdmin: boolean = false;
  user: User | any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  role: string=""
  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role')!;
    console.log('המספר שהתקבל בניתוב:', this.role);
    this.isAdmin = this.checkIfAdmin(this.role);
    console.log('isAdmin:', this.isAdmin);
   

    // })
  }
  checkIfAdmin(role: any): boolean {
    return role === '1' || role === '2';
  }


 
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}


