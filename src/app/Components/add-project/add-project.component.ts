import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/Model/Customer';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { CustomersService } from '@app/Services/customers.service';
import { ProjectService } from '@app/Services/project.service';
import { TaskService } from '@app/Services/task.service';
import { Project } from 'src/app/Model/Project';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { AuthService } from '@app/Services/auth.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, NgIf, MatFormFieldModule, DropdownModule, TranslateModule,]
})
export class AddProjectComponent implements OnInit {
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();

  statuses: StatusCodeProject[] = [];
  date: Date = new Date();
  projectForm: FormGroup = new FormGroup({});
  titlePage: string = "AddProject"
  custom: Customer[] = [];
  authorizeOptions: { label: string, value: number }[] = [
    { label: "Worker", value: 1 },
    { label: "Admin", value: 2 }]
  authorize: any;
  isAdmin: boolean = false
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private statusService: TaskService,
    private customerService: CustomersService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    authorize: [null];
    this.date = new Date()
    this.createForm();
    this.statusService.getAllStatus().subscribe(
      (data: any) => {
        this.statuses = data;
      },
      (error: any) => {
      }
    );
    this.customerService.GetAllCustomers().subscribe(
      (data: any) => {
        this.custom = data;
      },
      (error: any) => {
      }
    );
    const role = this.authService.getRole();
    if (role === 3) this.isAdmin = true;
    // console.log("onInit");
    // console.log("isAdmin", this.isAdmin);
    // console.log("role", role);
  }

  createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date()],
      endDate: ['', [Validators.required, this.futureDateValidator.bind(this)]],
      status: '',
      customer: ['', Validators.required],
      createdDate: [new Date()],
      authorize: [null]
    });
    this.dateValidator.bind(this)
  }

  onSubmit() {
    debugger
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    if (this.projectForm.valid) {

      const newProject: Project = this.projectForm.value;
      // console.log(newProject);

      this.projectService.addProject(newProject)
        .subscribe(
          (response) => {
            if (response) {
              // console.log("add success!!!");
              this.translate.get(['Close', 'ProjectAddSuccess']).subscribe(translations => {
                Swal.fire({
                  text: translations['ProjectAddSuccess'],
                  icon: "success",
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: "#3085D6",
                  confirmButtonText: translations['Close']
                })
              })
            }

            else {
              this.translate.get(['Close', 'ProblemMessage']).subscribe(translations => {
                Swal.fire({
                  text: translations['ProblemMessage'],
                  icon: "error",
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: "#d33",
                  confirmButtonText: translations['Close']
                })
              })
            }
            this.dataRefreshed.emit();
          },
          (error) => {
            this.translate.get(['Error adding project', 'close']).subscribe(translation =>
              this.translate.get(['Close', 'ProblemMessage']).subscribe(translations => {
                Swal.fire({
                  text: translations['ProblemMessage'],
                  icon: "error",
                  showCancelButton: false,
                  showCloseButton: true,
                  confirmButtonColor: "#d33",
                  confirmButtonText: translations['Close']
                })
              })
            );
            Swal.close();
          }
        );
    }
  }
  get name() { return this.projectForm.get('name') }
  get description() { return this.projectForm.get('description') }
  get startDate() { return this.projectForm.get('startDate') }
  get endDate() { return this.projectForm.get('endDate') }
  get status() { return this.projectForm.get('status') }
  get cucustomer() { return this.projectForm.get('customer') }
  // get createdDate(){ return this.projectForm.get('createdDate')}
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate >= today) {
      return null; // Return null if the selected date is in the future
    } else {
      return { notFutureDate: true }; // Return an error object if the selected date is not in the future
    }
  }
  dateValidator(group: FormGroup) {
    const startDate = new Date(group.get('startDate')?.value);
    const endDate = new Date(group.get('endDate')?.value);
    return startDate && endDate && startDate < endDate ? null : { invalidDates: true };

  }
}