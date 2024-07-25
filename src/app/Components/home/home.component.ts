import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports      : [RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatPseudoCheckboxModule, MatProgressSpinnerModule],
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

 
signInForm!: UntypedFormGroup;
showAlert: boolean = false;

/**
 * Constructor
 */
constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
)
{
}

// -----------------------------------------------------------------------------------------------------
// @ Lifecycle hooks
// -----------------------------------------------------------------------------------------------------

/**
 * On init
 */
ngOnInit(): void
{
    // Create the form
    this.signInForm = this._formBuilder.group({
        email     : ['', [Validators.required, Validators.email]],
        password  : ['', Validators.required],
        rememberMe: [''],
    });
}

// -----------------------------------------------------------------------------------------------------
// @ Public methods
// -----------------------------------------------------------------------------------------------------

/**
 * Sign in
 */
signIn(): void
{
}
}
