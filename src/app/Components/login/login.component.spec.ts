// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';
// import { RouterTestingModule } from '@angular/router/testing';
// import { UserService } from 'src/app/Services/user.service';
// import { ResetPasswordService } from 'src/app/Services/reset-password.service';
// import { of, throwError } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
// import { User } from 'src/app/Model/User';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let mockUserService: jasmine.SpyObj<UserService>;
//   let mockResetPasswordService: jasmine.SpyObj<ResetPasswordService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

//   beforeEach(async () => {
//     mockUserService = jasmine.createSpyObj('UserService', ['login']);
//     mockResetPasswordService = jasmine.createSpyObj('ResetPasswordService', ['resetPassword', 'setServerPassword']);
//     mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//     mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: {} });

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, MatDialogModule, RouterTestingModule],
//       declarations: [LoginComponent],
//       providers: [
//         { provide: UserService, useValue: mockUserService },
//         { provide: ResetPasswordService, useValue: mockResetPasswordService },
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the form with empty values', () => {
//     const email = component.email;
//     const password = component.pass;

//     expect(email.value).toBeNull();
//     expect(password.value).toBeNull();
//   });

//   it('should disable the submit button if the form is invalid', () => {
//     component.logInForm.controls['email'].setValue('');
//     component.logInForm.controls['password'].setValue('');
//     fixture.detectChanges();

//     const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
//     expect(submitButton.disabled).toBeTruthy();
//   });

//   it('should call login service on form submit', () => {
//     const mockUser: User = {
//       userId: 1,
//       createdDate:new Date(),
//       firstName: 'Test',
//       lastName: 'User',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 1
//     };

//     mockUserService.login.and.returnValue(of(mockUser));

//     component.logInForm.controls['email'].setValue('test@example.com');
//     component.logInForm.controls['password'].setValue('password123');
//     component.onSubmit();

//     expect(mockUserService.login).toHaveBeenCalledWith('test@example.com', 'password123');
//   });

//   it('should navigate to admin page if user role is 1', () => {
//     const mockUser: User = {
//       userId: 1,
//       createdDate:new Date(),
//       firstName: 'Test',
//       lastName: 'User',
//       email: 'test@example.com',
//       password: 'password123',
//       role: 1
//     };

//     mockUserService.login.and.returnValue(of(mockUser));
//     const routerSpy = spyOn(component.router, 'navigate');

//     component.logInForm.controls['email'].setValue('test@example.com');
//     component.logInForm.controls['password'].setValue('password123');
//     component.onSubmit();

//     expect(routerSpy).toHaveBeenCalledWith(['/admin'], { relativeTo: component.active });
//   });

//   it('should open error dialog on login failure', () => {
//     mockUserService.login.and.returnValue(throwError({ status: 400 }));
//     const dialogSpy = spyOn(component.dialog, 'open');

//     component.logInForm.controls['email'].setValue('test@example.com');
//     component.logInForm.controls['password'].setValue('password123');
//     component.onSubmit();

//     expect(dialogSpy).toHaveBeenCalled();
//   });
// });
