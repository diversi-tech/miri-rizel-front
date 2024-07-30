import { Component, OnInit } from '@angular/core';
import { UploadFilseComponent } from '../upload-filse/upload-filse.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '@app/Services/auth.service';
import { User } from '@app/Model/User';
import { UserService } from '@app/Services/user.service';

@Component({
  selector: 'app-customers-dashboard',
  standalone: true,
  imports: [UploadFilseComponent,NgFor,NgIf],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.css'
})
export class CustomersDashboardComponent implements OnInit {
  user:User| any

  constructor(private authService:AuthService,private _userService:UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token")?.toString()!
    const idtoken = this.authService.getClaim(token, "id")
    this._userService.getUserById(idtoken).subscribe((data: User) => {
      this.user = data
      if (!this.user)
        this.user.firstName = "משתמש"
    },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    )
  }
  getUser(){ 
    // console.log("dash",this.user);
    return this.user
  }
}
