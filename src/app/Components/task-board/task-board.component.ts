import { User } from 'src/app/Model/User';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { TaskService } from 'src/app/Services/task.service';
import { Task } from 'src/app/Model/Task';
import { UserService } from 'src/app/Services/user.service';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { ToastModule } from 'primeng/toast';
import { ComponentFactoryResolver, ViewContainerRef, Component, OnInit, Type, ViewChild } from '@angular/core';
import { Project } from 'src/app/Model/Project';
import { GenericBourdComponent } from 'src/app/Components/generic-bourd/generic-bourd.component';
import { AddTaskComponent } from 'src/app/Components/add-task/add-task.component';
import Swal from 'sweetalert2';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { Priority } from '@app/Model/Priority';
import { ProjectService } from '@app/Services/project.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GoogleTaskService } from '@app/Services/google-task.service';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  standalone: true,
  imports: [GenericBourdComponent, TranslateModule],
})

export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  statuses: StatusCodeProject[] = [];

  priorities: Priority[] = [];
  projects: Project[] = [];

  loading: boolean = true;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;

  constructor(private location: Location, private googletaskService: GoogleTaskService
    , private taskService: TaskService, private userService: UserService, private projectService: ProjectService, private resolver: ComponentFactoryResolver, private dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() {
    this.taskService.getAllPriorities().subscribe(
      (data) => {
        this.priorities = data
      }
    )

    this.projectService.getAll().subscribe(
      (data) => {
        this.projects = data
      }
    )

    this.taskService.getAllStatus().subscribe(
      (data) => {
        this.statuses = data
      }
    )


    this.taskService.getAll().subscribe(
      (tasks: Array<Task>) => {
        this.tasks = tasks.filter(o => o.project?.isActive == true);
        this.userService.getAll().subscribe(
          (users: Array<User>) => {
            this.users = users;
            this.loading = false;
          },
          (error: any) => {
            this.loading = false;
            this.translate.get(['Close', 'errorServer']).subscribe(translations => {
              // Swal.fire({
              //   text: translations[ 'errorServer'],
              //   icon: "error",
              //   showCancelButton: false,
              //   showCloseButton: true,
              //   confirmButtonColor: "#d33",
              //   confirmButtonText: translations['Close']
              // })
            })
          }

        );
      },

      // (error) => {
      //   console.error('Error fetching tasks:', error);
      //   this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
      // }
    );
  }

  componentType!: Type<any>;
  addTask() {
    this.componentType = AddTaskComponent;
    this.popUpAddOrEdit(null);
  }


  onEditTask(task: Task) {
    this.componentType = AddTaskComponent;
    this.popUpAddOrEdit(task.taskId!);
  }

  refreshData() {
    this.taskService.getAll().subscribe(
      (tasks: any) => {
        this.tasks = tasks;
        this.loading = false;
      })
  }

  popUpAddOrEdit(taskId: number | null) {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.setData(taskId);
          componentRef.instance.dataRefreshed.subscribe(() => {
            this.refreshData();
          })
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task.taskId!).subscribe(
      (data: any) => {
        if (data == true) {
          this.translate.get(['deleteTask', 'Close']).subscribe(translion =>
            Swal.fire({
              text: translion['deleteTask'],
              icon: "success",
              showCancelButton: false,
              showCloseButton: true,
              confirmButtonColor: "#3085D6",
              confirmButtonText: translion['Close']
            }).then((result) => {
              if (task.googleId!="")
                this.googletaskService.deleteTask(task.googleId!)
              this.taskService.getAll().subscribe((data) => {
                this.tasks = data
              })
            }));
        }
      },
      (error: any) => {
        this.loading = false;
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
  }
}