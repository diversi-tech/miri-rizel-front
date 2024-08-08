import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { GoogleComponent } from '../google/google.component';
import { SignUpComponent } from './sign-up.component';
import { EmailService } from '../../Services/sendEmailSignUp';
import { UserService } from '../../Services/user.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let emailService: EmailService;
  let userService: UserService;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        TranslateModule.forRoot(),
        SignUpComponent // Import the standalone component here
      ],
      providers: [
        { provide: EmailService, useValue: { sendEmailSignUp: jasmine.createSpy() } },
        { provide: UserService, useValue: { addUser: jasmine.createSpy() } },
        { provide: MatDialog, useValue: { open: jasmine.createSpy() } },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService);
    userService = TestBed.inject(UserService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.signUpForm).toBeDefined();
    expect(component.signUpForm.controls['email'].value).toBe('');
    expect(component.signUpForm.controls['firstName'].value).toBe('');
    expect(component.signUpForm.controls['lastName'].value).toBe('');
    expect(component.signUpForm.controls['password'].value).toBe('');
    expect(component.signUpForm.controls['ConfirmPassword'].value).toBe('');
  });

  it('should validate required fields', () => {
    component.signUpForm.controls['firstName'].setValue('');
    component.signUpForm.controls['lastName'].setValue('');
    component.signUpForm.controls['email'].setValue('');
    component.signUpForm.controls['password'].setValue('');
    component.signUpForm.controls['ConfirmPassword'].setValue('');

    component.toEnter();

    expect(component.signUpForm.controls['firstName'].errors).toEqual({ required: true });
    expect(component.signUpForm.controls['lastName'].errors).toEqual({ required: true });
    expect(component.signUpForm.controls['email'].errors).toEqual({ required: true });
    expect(component.signUpForm.controls['password'].errors).toEqual({ required: true });
    expect(component.signUpForm.controls['ConfirmPassword'].errors).toEqual({ required: true });
  });

  it('should validate password format', () => {
    component.signUpForm.controls['password'].setValue('short');
    component.toEnter();
    expect(component.signUpForm.controls['password'].errors).toEqual({ passwordInvalid: true });
  });

  it('should call addUser and sendEmailSignUp on successful form submission', () => {
    component.signUpForm.setValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        role: {
          id: 1,
          description: 'Customer'
        },
        password: 'Valid1Pass',
        ConfirmPassword:'Valid1Pass',
    });

    userService.addUser = jasmine.createSpy().and.returnValue(of({}));
    emailService.sendEmailSignUp =jasmine.createSpy().and.returnValue(of({}));

    component.toEnter();

    expect(userService.addUser).toHaveBeenCalledWith(component.signUpForm.value);
    expect(emailService.sendEmailSignUp).toHaveBeenCalledWith(component.signUpForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['../login']);
  });

  it('should validate password match', () => {
    component.userDetails.password = 'Password1';
    component.userDetails.password2 = 'DifferentPassword';
    component.validatePasswords();
    expect(component.passwordsMatch).toBe(false);
  });

  it('should have default userData value', () => {
    expect(component.userData).toBe('signUp');
  });
});
