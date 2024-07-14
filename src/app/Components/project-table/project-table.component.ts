import { CustomersService } from '@app/Services/customers.service';
import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Customer } from '@app/Model/Customer';
import { ProjectService } from '@app/Services/project.service';
import { Project } from 'src/app/Model/Project';
import Swal from 'sweetalert2';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { TaskService } from '@app/Services/task.service';
import { Task } from '@app/Model/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '@app/Model/Priority';
import { TaskBoardComponent } from '../task-board/task-board.component';
@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent {
  projects: Project[] = [];
  tasks: any[] = [];
  priorities: Priority[] = [];
  errorMessage: string = "";
  customers: Customer[] = [];
  statuses: StatusCodeProject[] = [];
  loading: boolean = true;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  constructor(private ProjectService: ProjectService, private active: ActivatedRoute, private resolver: ComponentFactoryResolver, private router: Router, private taskService: TaskService, private CustomerService: CustomersService) { }

  ngOnInit() {
    console.log("projectComponent");
    this.taskService.getAll().subscribe(
      (data) => {
        this.tasks = data
        console.log(this.tasks);
      })
    this.taskService.getAllPriorities().subscribe(
      (data) => {
        this.priorities = data
      }
    )

    this.ProjectService.getAll().subscribe(
      (p: Array<Project>) => {
        this.projects = p;
        console.log(this.projects);
        this.loading = false;
        this.taskService.getAllStatus().subscribe(
          (data) => {
            this.statuses = data
          })
        this.CustomerService.GetAllCustomers().subscribe(
          (data) => {
            this.customers = data
          })
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.loading = true;
      }
    );

  }
  componentType!: Type<any>;
 
  // onDeleteProject(p: Project) {
  //   this.ProjectService.deleteProject(p.projectId).subscribe(
  //     (data: any) => {
  //       if (data == true) {
  //         Swal.fire({
  //           text: "The task was successfully deleted",
  //           icon: "success",
  //           showCancelButton: false,
  //           showCloseButton: true,
  //           confirmButtonColor: "#3085D6",
  //           confirmButtonText: "Close"
  //         }).then((result) => {
  //           this.ProjectService.getAll().subscribe((data) => {
  //             this.projects = data
  //           })
  //         });
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }
  onDeleteProject(p: Project) {
    this.ProjectService.deleteProject(p.projectId).subscribe((res:any)=>{this.loadP();
});
}

  loadP(): void {
    debugger
    this.ProjectService.getAll().subscribe(res => {
      this.projects = res;
      this.loading = false;
    });
  }

  filterData(objToFilter: any) {
    let taskFilter: Task[] = this.tasks.filter(u => u.project.projectId == objToFilter.projectId)
    console.log(taskFilter)
    if (taskFilter.length != 0) {
      let loading: boolean = true
      let col$types = { 'title': 'text',  'dueDate': 'date', 'createdDate': 'date' }
      let positionD = [this.statuses]
      let objData = [this.projects]
      let objFields = ['name']
      this.genericBourd.PopTable(taskFilter, loading, col$types, objData, objFields, positionD);
    }
    
  }
 
  addProject() {
    this.componentType = AddProjectComponent;
    this.popUpAddOrEdit("Add project");
     this.refreshData();
  }
  fetchTasks(projectId: string): void {
    if (projectId) {
      this.ProjectService.getTaskByProject(projectId).subscribe(
        (data) => {
          this.tasks = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Error fetching tasks. Please try again.';
          this.tasks = [];
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid project code.';
    }
  }
  onEditProject(p: Project) {
    this.componentType = EditProjectComponent;
    this.popUpAddOrEdit("Edit project");
  }
  popUpAddOrEdit(title: string) {
    Swal.fire({
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
  refreshData() {
    this.ProjectService.getAll().subscribe(
      (project: any) => {
        this.projects = project;
        this.loading = false;
        console.log("refreshData: ", this.projects);
      })
  }
}


