// import { User } from 'src/app/Model/User';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { InputTextModule } from 'primeng/inputtext';
// import { Customer, Representative } from 'src/app/Model/Customer';
// import { CustomerService } from 'src/app/Services/customer.service';
// // import { ButtonModule } from 'primeng/button';
// import { Table } from 'primeng/table';
// import { TaskService } from 'src/app/Services/task.service';
// import { Task } from 'src/app/Model/Task';
// import { UserService } from 'src/app/Services/user.service';
// // import { ProgressBarModule } from 'primeng/progressbar';
// // import { ToastModule } from 'primeng/toast';

// @Component({
//   selector: 'app-task-board',
//   templateUrl: './task-board.component.html',
//   styleUrls: ['./task-board.component.css'],
//   // imports: [ProgressBarModule,ToastModule]

// })

// export class TaskBoardComponent implements OnInit {
//   customers!: Customer[];

//   tasks!: Task[];

//   users!: User[];

//   any:any

//   usersFormating: { name: string; id: number }[] = [];

//   selectedCustomers!: Customer[];

//   selectedTasks!: Task[];

//   representatives!: Representative[];

//   statuses!: any[];

//   loading: boolean = true;

//   activityValues: number[] = [0, 100];

//   constructor(private customerService: CustomerService, private taskService: TaskService, private userService: UserService) { }

//   ngOnInit() {
//     this.customerService.getCustomersLarge().then((customers) => {
//       this.customers = customers;
//       this.loading = false;

//       this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));


//     });
//     this.taskService.getAll().subscribe(
//       (tasks: Array<Task>) => {
//         this.tasks = tasks;
//         this.loading = false;
//         this.tasks.forEach((task) => (task.dueDate = new Date(<Date>task.dueDate)));
//         console.log(this.tasks);

//       },
//       (error) => {
//         console.error('Error fetching tasks:', error);
//       }
//     );
//     this.userService.getAll().subscribe(
//       (users: Array<User>) => {
//         this.users = users
//         this.loading = false;

//         // users.forEach(u => this.usersFormating.push({ name: u.firstName + ' ' + u.lastName, id: u.userId }))
//         console.log(this.users);
//         // console.log(this.usersFormating);

//       },
//       (error) => {
//         console.error('Error fetching games:', error);
//       }
//     );
    

//     this.statuses = [
//       { label: 'InProgress', value: 'InProgress' },
//       { label: 'Complited', value: 'Complited' },
//       { label: 'Beginning', value: 'Beginning' },
     
//     ];
//   }

//   getSeverity(status: string) {
//     switch (status) {
//       case 'a':
//         return 'danger';

//       case 'Complited':
//         return 'success';

//       case 'Beginning':
//         return 'info';

//       case 'InProgress':
//         return 'warning';

//       case 'renewal':
//         return 'null';
//       default:
//         return 'null';

//     }
//   }
//   getAssignment(assignetoId: number) {
//     // console.log(this.usersFormating.find(u => u.id == assignetoId));
    
//     // return this.usersFormating.find(u => u.id == assignetoId)

//   }
// }


