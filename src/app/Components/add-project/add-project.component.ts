
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/Model/Project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  
  projectForm:FormGroup= new FormGroup({}); 

  constructor(
    private fb: FormBuilder,
    private projectService:ProjectsService
  ) {
    this.createForm();
  }

  createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: '',
      customerId: ['', Validators.required]
    }, { validator: this.dateValidator });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;
      this.projectService.addProject(newProject)
        .subscribe(
          (response) => {
            console.log('Project added successfully:', response);
            // כאן נוסיף פעולות נוספות בהתאם לצורך
          },
          (error) => {
            console.error('Error adding project:', error);
            // טיפול בשגיאות
          }
        );
    } else {
      console.error('Form is invalid');
      // טיפול בכניסות לא תקינות
    }
  }

  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { invalidDates: true };
    }

    return null;
  }
}
