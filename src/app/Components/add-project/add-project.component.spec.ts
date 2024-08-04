

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProjectComponent } from './add-project.component';
import { ProjectService } from '@app/Services/project.service';
import { TaskService } from '@app/Services/task.service';
import { CustomersService } from '@app/Services/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService, TranslateStore, TranslateLoader } from '@ngx-translate/core';
import { TranslateModule, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let projectService: ProjectService;
  let statusService: TaskService;
  let customerService: CustomersService;
  let dialog: MatDialog;
  let translateService: TranslateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } }),
        AddProjectComponent
      ],
      providers: [
        ProjectService,
        TaskService,
        CustomersService,
        MatDialog,
        TranslateService,
        TranslateStore
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    statusService = TestBed.inject(TaskService);
    customerService = TestBed.inject(CustomersService);
    dialog = TestBed.inject(MatDialog);
    translateService = TestBed.inject(TranslateService);
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with default values', () => {
    fixture.detectChanges();
    expect(component.projectForm).toBeTruthy();
    expect(component.projectForm.get('name')).toBeTruthy();
    expect(component.projectForm.get('description')).toBeTruthy();
    expect(component.projectForm.get('startDate')).toBeTruthy();
    expect(component.projectForm.get('endDate')).toBeTruthy();
    expect(component.projectForm.get('status')).toBeTruthy();
    expect(component.projectForm.get('customer')).toBeTruthy();
    expect(component.projectForm.get('createdDate')?.value).toBeInstanceOf(Date);
  });
  it('should fetch statuses and customers on initialization', () => {
    const statuses = [{ id: 1, description: 'Admin' },{id:2,description:'Worker'},{id:3,description:'User'}];
    const customers = [{ id: 1, firstName: 'Customer 1' }];
    spyOn(statusService, 'getAllStatus').and.returnValue(of(statuses));
   // spyOn(customerService, 'GetAllCustomers').and.returnValue(of(customers));
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.statuses).toEqual(statuses);
   // expect(component.custom).toEqual(customers);
  });
  it('should handle error when fetching statuses', () => {
    spyOn(statusService, 'getAllStatus').and.returnValue(throwError(() => new Error('Error fetching statuses')));
    spyOn(console, 'error');
    fixture.detectChanges(); // Trigger ngOnInit
    expect(console.error).toHaveBeenCalledWith('Error fetching status:', jasmine.any(Error));
  });
  it('should handle error when fetching customers', () => {
    spyOn(customerService, 'GetAllCustomers').and.returnValue(throwError(() => new Error('Error fetching customers')));
    spyOn(console, 'error');
    fixture.detectChanges(); // Trigger ngOnInit
    expect(console.error).toHaveBeenCalledWith('Error fetching customers:', jasmine.any(Error));
  });
  it('should validate future date correctly', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateControl = {
      value: futureDate
    } as AbstractControl;
    const result = component.futureDateValidator(futureDateControl);
    expect(result).toBeNull();
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateControl = {
      value: pastDate
    } as AbstractControl;
    const errorResult = component.futureDateValidator(pastDateControl);
    expect(errorResult).toEqual({ notFutureDate: true });
  });
  it('should validate dates correctly', () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-15');
    const formGroup = {
      get: (controlName: string) => ({
        value: controlName === 'startDate' ? startDate : endDate
      })
    };
    const result = component.dateValidator(formGroup as FormGroup);
    expect(result).toBeNull();
    formGroup.get = (controlName: string) => ({
      value: controlName === 'startDate' ? endDate : startDate
    });
    const errorResult = component.dateValidator(formGroup as FormGroup);
    expect(errorResult).toEqual({ invalidDates: true });
  });
  it('should submit form and call service', () => {
    spyOn(projectService, 'addProject').and.returnValue(of({ success: true }));
    spyOn(translateService, 'get').and.returnValue(of({ seccesaddProject: 'Project added successfully', close: 'Close' }));
    spyOn(dialog, 'open');
    spyOn(Swal, 'close');
    component.projectForm.setValue({
      name: 'Project Name',
      description: 'Project Description',
      startDate: new Date(),
      endDate: new Date(),
      // status: {  },
      // customer: {},
      createdDate: new Date()
    });
    component.onSubmit();
    expect(projectService.addProject).toHaveBeenCalledWith(component.projectForm.value);
    expect(dialog.open).toHaveBeenCalledWith(DialogComponent, {
      data: {
        title: 'Project added successfully',
        context: 'Project Name',
        buttonText: 'Close'
      }
    });
    expect(Swal.close).toHaveBeenCalled();
  });
  it('should not submit form if invalid', () => {
    spyOn(projectService, 'addProject');
    component.projectForm.setValue({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      customer: '',
      createdDate: new Date()
    });
    component.onSubmit();
    expect(projectService.addProject).not.toHaveBeenCalled();
  });
});