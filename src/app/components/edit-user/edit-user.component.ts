import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  user: User = {
    first_name: '',
    last_name: '',
    password: '',
    role: '',
    email: '',
    // created_date: '',
  };
  flag: Boolean = false;

  constructor(private edituser: EditUserService) {}
  edit() {
    localStorage.setItem('user', JSON.stringify('dnxjZ'));
    this.edituser
      .editUser(localStorage.getItem('email'))
      .subscribe((res) => (this.user = res));
    this.flag = true;
  }
  submit() {
    console.log(this.user);
    this.edituser.editUserPost(this.user);
    this.flag = false;
  }
}
