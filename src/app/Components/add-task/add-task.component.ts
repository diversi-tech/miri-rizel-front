import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { Task } from 'src/app/Model/Task';
import { User } from 'src/app/Model/User';
import { ProjectService } from 'src/app/Services/project.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { StatusCodeProject } from 'src/app/Model/StatusCodeProject';
import { Priority } from 'src/app/Model/Priority';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { GoogleAuthService } from '@app/Services/google-auth.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {

  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();

  data: any;

  taskForm: FormGroup = new FormGroup({});

  newTask: Task = {};

  titlePage: string = "הוספת משימה"

  isEdit: boolean = false;

  users: User[] = [];

  projects: Project[] = [];

  statuses: StatusCodeProject[] = [];

  priorities: Priority[] = [];

  filteredProjects: Project[] = [];

  filteredUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private location: Location,
    private GoogleAuthService: GoogleAuthService
  ) { }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      taskId: [''],
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator.bind(this)]],
      assignedTo: ['', Validators.required],
      project: ['', Validators.required],
    });

    this.userService.getAll().subscribe(
      (data: any) => {
        this.users = data;
        this.filteredUsers = data
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );

    this.taskService.getAllStatus().subscribe(
      (data: any) => {
        this.statuses = data;
      },
      (error: any) => {
        console.error('Error fetching status:', error);
      }
    );

    this.taskService.getAllPriorities().subscribe(
      (data: any) => {
        this.priorities = data;
      },
      (error: any) => {
        console.error('Error fetching status:', error);
      }
    );

    this.projectService.getAll().subscribe(
      (data: any) => {
        this.projects = data;
        this.filteredProjects = data;
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );

    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        this.isEdit = true;
        this.loadTask(taskId);
        this.titlePage = "עריכת משימה"
      }
    });
  }

  get title() { return this.taskForm.get('title') }
  get priority() { return this.taskForm.get('priority') }
  get description() { return this.taskForm.get('description') }
  get status() { return this.taskForm.get('status') }
  get dueDate() { return this.taskForm.get('dueDate') }
  get assignedTo() { return this.taskForm.get('assignedTo') }
  get project() { return this.taskForm.get('project') }


  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today ? null : { notFutureDate: true };
  }

setData(data: any) {
    if (data) {
      this.data = data;
      this.isEdit = true;
      this.loadTask(data);
      this.titlePage = "עריכת משימה"
    }
  }

  userExistsValidator(user: User) {
    if (user && !this.users.find(u => u.userId === user.userId))
      return false
    return true;
  }

  projectExistsValidator(project: Project) {
    if (project && !this.projects.find(u => u.projectId === project.projectId))
      return false
    return true;
  }

  loadTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(
      (task: any) => {
        this.taskForm.patchValue({
          taskId: task.taskId,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          assignedTo: task.assignedTo,
          project: task.project,
        });
        this.newTask = this.taskForm.value;
      },
      (error: any) => {
        console.error('Error loading task', error);
      }
    );
  }

  displayFn(user: User): string {
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  filterUserAuto(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.users as any[]).length; i++) {
      let user = (this.users as any[])[i];
      if (user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
      ) {
        filtered.push(user);
      }
    }
    this.filteredUsers = filtered;
  }

  onUserSelected(event: any): void {
    const selectedUser = event.value;
    this.taskForm.patchValue({
      assignedTo: selectedUser
    });
  }

  filterProjectAuto(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.projects as any[]).length; i++) {
      let project = (this.projects as any[])[i];
      if (project.name.toLowerCase().includes(query)) {
        filtered.push(project);
      }
    }
    this.filteredProjects = filtered;
  }

  onProjectSelected(event: any): void {
    const selectedProject = event.value;
    this.taskForm.patchValue({
      project: selectedProject
    });
  }


  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (!this.userExistsValidator(this.assignedTo?.value)) {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'שגיאה',
          context: 'יש לבחור לקוח שקיים במערכת',
          buttonText: 'סגור',
        },
      });
      return;
    }

    if (!this.projectExistsValidator(this.project?.value)) {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'שגיאה',
          context: 'יש לבחור פרויקט שקיים במערכת',
          buttonText: 'סגור',
        },
      });
      return;
    }
    this.newTask = this.taskForm.value;
    this.newTask.assignedTo = this.assignedTo?.value

    if (this.taskForm.valid) {
      if (!this.isEdit) {
        this.newTask.createdDate = new Date();
        this.taskService.addTask(this.newTask).subscribe(
          (response) => {
            if (response) {
              this.dataRefreshed.emit();
              Swal.close()
              Swal.fire({
                title: "!המשימה נוספה בהצלחה",
                text: " האם תרצה להוסיף את המשימה ל-Google Tasks?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "שמור",
                denyButtonText: `אל תשמור`
              }).then((result) => {
                if (result.isConfirmed) {
                  this.scheduleMeeting()
                } else if (result.isDenied) {
                  Swal.fire("Google Tasks המשימה לא נוספה ל", "", "info");
                }
              });
              this.location.go(this.location.path());
              this.router.navigate(['/task-board']);
            }
          },
          (error) => {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Error adding task',
                context: (" התרחשה בעיה מהצד שלנו"),
                buttonText: 'סגור',
              },
            })
          }
        );
      }
      else {
        this.taskService.updateTask(this.newTask).subscribe(
          (response) => {
            this.dataRefreshed.emit();
            Swal.close()
            this.dialog.open(DialogComponent, {
              data: {
                title: 'המשימה עודכנה בהצלחה',
                context: this.newTask.title,
                buttonText: 'סגור',
              },
            }).afterClosed().subscribe(() => {
              this.location.go(this.location.path()); // זה יגרום לרענון של הדף הנוכחי
            });
          },
          (error) => {
            this.dialog.open(DialogComponent, {
              data: {
                title: 'Error update task',
                context: (" התרחשה בעיה מהצד שלנו"),
                buttonText: 'סגור',
              },
            })
          }
        );
      }
    }
  }

  scheduleMeeting() {
    let appointmentTime = new Date(this.taskForm.value.dueDate);
    const startTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
    const eventDetails = {
      email: this.taskForm.value.assignedTo.email,
      startTime: startTime,
      nameT: this.taskForm.value.title,
      description: this.taskForm.value.description
    };
    console.info(eventDetails);
    this.GoogleAuthService.createGoogleEvent(eventDetails)
  }

}

