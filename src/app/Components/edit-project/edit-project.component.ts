import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/Model/project';
import {UpdateProjectService}from 'src/app/Services/update-project.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  project: Project = { name: "", description: "", startDate: new Date(), endDate: new Date(), 
    createdDate: new Date(), customerId: 0,projectId:0 ,status:""}
    // flag: Boolean = false;
    // ProjectForm!: FormGroup ;
       
    ProjectForm!: FormGroup;

    constructor(private server:UpdateProjectService,private formBuilder:FormBuilder){
      // בניית הטופס בעזרת FormBuilder
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
    }
  
    edit(project: Project) {
      this.ProjectForm.setValue({
        projectId: project.projectId,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        createdDate: project.createdDate,
        customerId: project.customerId,
      });
    }
  

    // edit(project:Project){
    //   this.ProjectForm = this.formBuilder.group({
    //     projectId: [project.projectId, [Validators.required]],
    //     Name: [ [project.name,Validators.required]],
    //     description: [project.description, [Validators.required]],
    //     startDate: [project.startDate,[Validators.required]],
    //     endDate: [project.endDate, [Validators.required]],
    //     status: [ [project.status,Validators.required]],
    //     createdDate: [project.createdDate, [Validators.required]],
    //     customerId: [project.customerId,[Validators.required]],
    //   });
    // }
    
    submit(){
      if (this.ProjectForm.valid) {
        const updatedProject: Project = this.ProjectForm.value;
          this.server.update(updatedProject).subscribe(p=>alert("העדכון בוצע בהצלחה!"));
         
    }  
}

}