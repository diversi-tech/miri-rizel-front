import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Model/Task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-exemple',
  templateUrl: './exemple.component.html',
  styleUrls: ['./exemple.component.css']
})
export class ExempleComponent implements OnInit {

  tasks: Task[] = [];
  loading: boolean = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    console.log("ExempleComponent");
    
    this.taskService.getAll().subscribe(
      (tasks: Array<Task>) => {
        this.tasks = tasks;
        this.loading = false;
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
      }
    );  
  }
}
