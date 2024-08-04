import { Component, OnInit } from '@angular/core';
import { UploadFilseComponent } from '@app/Components/upload-filse/upload-filse.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '@app/Services/auth.service';
import { User } from '@app/Model/User';
import { UserService } from '@app/Services/user.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers-dashboard',
  standalone: true,
  imports: [UploadFilseComponent,NgFor,NgIf],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.css'
})
export class CustomersDashboardComponent implements OnInit {
  user:User| any

  constructor(private authService:AuthService,private _userService:UserService,private translate:TranslateService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token")?.toString()!
    const idtoken = this.authService.getClaim(token, "id")
    this._userService.getUserById(idtoken).subscribe((data: User) => {
      this.user = data
      if (!this.user)
        this.user.firstName = "משתמש"
    },
      (error: any) => {
        (error: any) => {
          this.translate.get(['Close', 'Error Server']).subscribe(translations => {
            Swal.fire({
              text: translations['Error Server '],
              icon: "error",
              showCancelButton: false,
              showCloseButton: true,
              confirmButtonColor: "#d33",
              confirmButtonText: translations['Close']
            })
          })
        }      }
    )
  }
  getUser(){ 
    // console.log("dash",this.user);
    return this.user
  }
}
