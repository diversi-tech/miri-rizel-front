import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserService } from '@app/Services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class AddUserComponent implements OnInit {
  submitted: boolean = false;
  userForm!: FormGroup;
  titlePage: string = "AddUserTitle";
  roleOptions = [
    { id: 1, description: "Customer" },
    { id: 2, description: "Worker" },
    { id: 3, description: "Admin" }
  ];

  styles = {
    'text-align': 'right',
    'direction': 'rtl'
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService, private translate: TranslateService, private router: Router) { }
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
    this.titlePage = "AddUserTitle"
  }

  get formControls() {
    return this.userForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  addUserSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.userService.addUser(this.userForm.value).subscribe(() => {
      this.translate.get('addUserSuccess').subscribe((translation) =>
        Swal.fire({ title: translation, icon: 'success' }).then(() => {
          this.userForm.reset();
          this.submitted = false;
          this.router.navigate(['/users']); // Redirect to user list or any desired page
        })
      );
      this.dataRefreshed.emit();
      Swal.close();
    }, (error) => {
      console.error(error);
      Swal.fire({ title: 'Error', text: 'Failed to add user', icon: 'error' });
    });
  }
}
