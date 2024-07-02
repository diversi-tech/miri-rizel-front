
import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Country, Customer, Representative } from '@app/Model/Customer';
import { Customer2 } from '@app/Model/Customer2';
import { CustomerService } from '@app/Services/customer.service';
import { ProjectService } from '@app/Services/project.service';
import { Project } from 'src/app/Model/Project';
import Swal from 'sweetalert2';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent {
  projects: Project[] = [];
  customers: Customer2 []=[];
  loading: boolean = true;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  constructor(private ProjectService: ProjectService, private resolver: ComponentFactoryResolver, private costomerService: CustomerService) { }

  ngOnInit() {
    console.log("projectComponent");
    this.ProjectService.getAll().subscribe(
      (p: Array<Project>) => {
        this.projects = p;
        console.log(this.projects);
        this.loading = false;
        debugger
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.loading = true; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
      }
    );
    
  }



  componentType!: Type<any>;
  onEditProject(p: Project) {
    this.componentType = EditProjectComponent;
    this.popUpAddOrEdit("edit project");
    console.log('Edit task:', p);
  }
  // getCustomer(id:number){
  //   debugger
  //     this.costomerService.getById(id).subscribe(
  //       (p: Customer2) => {
  //         this.customers = p;
  //         console.log(this.customers)
  //         console.log(this.costomerService);
  //         this.loading = false;
  //       },
  //       (error) => {
  //         console.error('Error fetching customer:', error);
  //         this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
  //       }
  //     );
  // }
  onDeleteProject(p: Project) {
    this.ProjectService.deleteProject(p.projectId)
    console.log('Delete task:', p);
  }

  filterData(objToFilter: any) {
    let projectFilter: Project[] = this.projects.filter(u => u.status == objToFilter)
    let loading: boolean = true
    let col$types = { 'lastName': 'text', 'firstName': 'text' }
    let positionD: [] = []
    let objData = [this.customers]
    let objFields = ['firstName']
    this.genericBourd.PopTable(projectFilter, loading, col$types, objData, objFields, positionD);
  }
  // filterData(objToFilter: any) {
  //   let userFilter: User[] = this.users.filter(u => u.lastName == objToFilter.assignedTo.lastName)
  //   let loading:boolean = true
  //   let col$types = { 'lastName': 'text', 'firstName': 'text' }
  //   let positionD:[] = []
  //   let objData = [this.users, this.projects]
  //   let objFields = ['email','name']
  //   this.genericBourd.PopTable(userFilter, loading, col$types,objData,objFields,positionD);
  // }

  addProject() {
    this.componentType = AddProjectComponent;
    this.popUpAddOrEdit("Add project");
  }

  popUpAddOrEdit(title: string) {
    Swal.fire({
      title: title,
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        debugger
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }
}


