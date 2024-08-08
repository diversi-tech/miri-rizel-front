import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from 'src/app/Model/Project';
import { ProjectService } from 'src/app/Services/project.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { Data } from '@angular/router';
import { Customer } from '@app/Model/Customer';
import { CustomersService } from '@app/Services/customers.service';
import { TaskService } from '@app/Services/task.service';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@app/Services/language.service';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, NgIf, MatFormFieldModule, DropdownModule, TranslateModule,]
})
export class EditProjectComponent {
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();
  customerName: any;
  flag: boolean = false;
  custom: Customer[] = [];
  statuses: StatusCodeProject[] = [];
  project: Project = { projectId: 0 };
  status: StatusCodeProject = {};
  customer: Customer = { customerId: 0, status: {} };
  ProjectForm!: FormGroup;
  submitted = false;
  data: any;
  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    'direction': 'rtl'     // ברירת מחדל עברית
  };
  @Output() ProjectId: EventEmitter<void> = new EventEmitter<void>();
  constructor(private server: ProjectService, private formBuilder: FormBuilder, private pro: ProjectService, private statusService: TaskService,
    private customerService: CustomersService,
    private languageService: LanguageService, private translate: TranslateService) {
  }
  ngOnInit() {
    this.statusService.getAllStatus().subscribe(
      (data: any) => {
        this.statuses = data;
      },
      (error: any) => {
        this.translate.get(['Close', 'errorServer']).subscribe(translations => {
          Swal.fire({
            text: translations['errorServer'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      }
    );
    this.customerService.GetAllCustomers().subscribe(
      (data: any) => {
        this.custom = data;
      },
      (error: any) => {
        this.translate.get(['Close', 'errorServer']).subscribe(translations => {
          Swal.fire({
            text: translations['errorServer'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      }
    );
    this.languageService.language$.subscribe(lang => {
      if (lang === 'he') {
        this.styles['text-align'] = 'right';
        this.styles['direction'] = 'rtl';
      } else {
        this.styles['text-align'] = 'left';
        this.styles['direction'] = 'ltr';
      }
    })
   
  }
  setData(data: any) {
    debugger;
    this.data = data;
    this.server.getProjectById(this.data).subscribe(
          (project2: Project) => {
            this.project = project2;
            debugger
            this.fullForm();
          }
    );
  }
 
  extractDate(dateTime: string): string {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  fullForm() {
    debugger
    if (!this.project) { console.error('Project data is not available'); return; }
    this.status = this.project.status!;
    this.customer = this.project.customer!
    this.ProjectForm = this.formBuilder.group({
      projectId: [null, Validators.required],
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      startDate: [this.extractDate(String(this.project.startDate)), Validators.required],
      endDate: [this.extractDate(String(this.project.endDate)), Validators.required],
      status: [this.project.status, Validators.required],
      createdDate: [this.extractDate(String(this.project.createdDate)), Validators.required],
      customer: [this.project.customer, Validators.required],
      isActive: [true]
    });
    this.flag = true;
  }
  async toEnter() {
    this.server.update(this.ProjectForm.value, this.data).subscribe(() => Swal.close())
    await this.delay(50);
    Object.keys(this.ProjectForm.controls).forEach((key) => {
      this.ProjectForm.controls[key].markAsUntouched();
    });
    this.dataRefreshed.emit();
    Swal.close();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}