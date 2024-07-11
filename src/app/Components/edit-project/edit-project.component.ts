import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@app/Model/Customer';
import { Project } from '@app/Model/Project';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { CustomersService } from '@app/Services/customers.service';
import { ProjectService } from '@app/Services/project.service';
import { TaskService } from '@app/Services/task.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  flag: Boolean = false;
  custom: Customer[] = [];
  statuses: StatusCodeProject[] = [];
  project!: Project;
    ProjectForm!: FormGroup<any>;
    constructor(private server:ProjectService,private formBuilder:FormBuilder,private statusService: TaskService,
      private customerService: CustomersService,){
    }
    ngOnInit() {
      // אתחול הטופס עם ערכים ריקים או ברירת מחדל
      this.ProjectForm = this.formBuilder.group({
        projectId: [null, Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        status: ['', Validators.required],
        createdDate: [null, Validators.required],
        customerId: [null, Validators.required],
      });
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
    
    // edit1() {
    //   localStorage.setItem('user', JSON.stringify("dnxjZ"))
    //   this.editproject.editUser(localStorage.getItem('email')).subscribe(res => this.user = res)
    //   this.flag = true
    // }
    edit(project: Project) {
      this.ProjectForm.setValue({
        projectId: project.projectId,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        createdDate: project.createdDate,
        customerId: project.customer_id,
      });
    }
    submit(){
      if (this.ProjectForm.valid) {
        const updatedProject: Project = this.ProjectForm.value;
          this.server.update(updatedProject).subscribe(p=>alert("העדכון בוצע בהצלחה!"));
    }
}

}
