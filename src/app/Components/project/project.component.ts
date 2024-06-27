import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
 

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService, private router: Router, private active: ActivatedRoute) {
   
  }
  

  addForm: FormGroup = new FormGroup({});
  
  currentProject: Project = { name: "", description: "", startDate: new Date(), endDate: new Date(), status: "", createdDate: new Date(), customerId: 0, projectId: 1 }
  flag: Boolean = false;
  Add() {
    debugger
      this.projectsService.addProject(this.currentProject).subscribe(res => {console.log(res),this.currentProject = res})
  }
 
  ngOnInit(): void {
    
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.name]],
      description: ['', [Validators.required]],
      startDate: [Date, [Validators.required]],
      endDate: [Date, [Validators.required]],
      customerId: [Number, [Validators.required]],
      status: ['', [Validators.required]],
      createdDate: [Date, [Validators.required]],
    });
      
  };
  get formControls() { return this.addForm.controls; }
}
