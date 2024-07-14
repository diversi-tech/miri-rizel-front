import { Component, Output ,EventEmitter} from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/Model/Project';
import {ProjectService}from 'src/app/Services/project.service'
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
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();
  flag: Boolean = false;
  custom: Customer[] = [];
  statuses: StatusCodeProject[] = [];
  project!: Project;
  status: number= 0;
  customerId: number= 0;
  //   ProjectForm: FormGroup<any>=new FormGroup({
  //     firstName: new FormControl(),
  //     projectId: new FormControl(),
  //   myName: new FormControl(),
  //   myDescription: new FormControl(),
  //   myStrartDate: new FormControl(),
  //   myEndDate: new FormControl(),
  //    mystatuses:new FormControl(),
  //   myCreatedDate: new FormControl(),
  //    myCustomerId: new FormControl(),
  // });
   ProjectForm!: FormGroup;
    submitted = false;
    data: any;
  @Output() ProjectId: EventEmitter<void> = new EventEmitter<void>();
    constructor(private server:ProjectService,private formBuilder:FormBuilder,private pro:ProjectService, private statusService: TaskService,
      private customerService: CustomersService){
    }
    ngOnInit() {
    this.statusService.getAllStatus().subscribe(
      (data: any) => {
        this.statuses = data;
      },
      (error: any) => {
        console.error('Error fetching status:', error);
      }
    );
    this.customerService.GetAllCustomers().subscribe(
      (data: any) => {
        this.custom = data;
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
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
   fullForm(){
    console.log(`this.project.status: ${this.project.status} ${Number(this.project.status)}`);
  this.status= Number(this.project.status);
// this.c = Number(this.project.customerId)
 this.customerId = Number(this.project.customer)
   this.ProjectForm = this.formBuilder.group({
    projectId: [null, Validators.required],
    name: [this.project.name, Validators.required],
    description: [this.project.description, Validators.required],
    startDate: [this.extractDate(String(this.project.startDate)), Validators.required],
    endDate: [this.extractDate(String(this.project.endDate)), Validators.required],
    status: [this.project.status, Validators.required],
    createdDate: [this.extractDate(String(this.project.createdDate)), Validators.required],
    customerId: [this.project.customer, Validators.required],
  });
console.log(this.project);
this.flag=true;
}
      setData(data: any) {
        debugger;
        this.data = data;
        console.log("data: ", data);
        this.server.getProjectById(this.data).subscribe((project2: Project) => {
          this.project = project2;
          console.log(`project: `, this.project);
          this.fullForm();
        });
      }
    submit(){
      if (this.ProjectForm.valid) {
        const updatedProject: Project = this.ProjectForm.value;
          this.server.update(updatedProject).subscribe(p=>alert("העדכון בוצע בהצלחה!"));
      }
      }
    }
