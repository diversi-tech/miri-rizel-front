import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/Model/Project';
import { Task } from 'src/app/Model/Task';
import { User } from 'src/app/Model/User';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';

@Component({
  selector: 'app-exemple',
  templateUrl: './exemple.component.html',
  styleUrls: ['./exemple.component.css']
})
export class ExempleComponent implements OnInit {

  tasks: Task[] = [];
  users: User[] = [];
  projects: Project[] = [];
  loading: boolean = true;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;

  constructor(private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    console.log("ExempleComponent");

    this.taskService.getAll().subscribe(
      (tasks: Array<Task>) => {
        this.tasks = tasks;
        // this.loading = false;
        console.log(this.tasks);
        this.userService.getAll().subscribe(
          (users: Array<User>) => {
            this.users = users;
            this.loading = false;
            console.log(this.users);
          },
          (error) => {
            console.error('Error fetching users:', error);
            this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
          }
        );
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
      }
    );
  }
  onEditTask(task: Task) {
    // Handle edit logic here
    console.log('Edit task:', task);
  }

  onDeleteTask(task: Task) {
    // Handle delete logic here
    console.log('Delete task:', task);
  }

  filterData(objToFilter: any) {
    let userFilter: User[] = this.users.filter(u => u.lastName == objToFilter.assignedTo.lastName)
    let loading = "true"
    let col$types = { 'lastName': 'text', 'firstName': 'text' }
    let edito = "onEditTask($event)"
    let deleteo = "onDeleteTask($event)"
    this.genericBourd.PopTable(userFilter);
  }
}
