// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProjectTableComponent } from './project-table.component';
// import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
// import { ProjectService } from 'src/app/Services/project.service';
// import { TaskService } from 'src/app/Services/task.service';
// import { CustomersService } from '@app/Services/customers.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { of, throwError } from 'rxjs';
// import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('ProjectTableComponent', () => {
//   let component: ProjectTableComponent;
//   let fixture: ComponentFixture<ProjectTableComponent>;
//   let projectService: ProjectService;
//   let taskService: TaskService;
//   let customerService: CustomersService;
//   let translateService: TranslateService;
//   let router: Router;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers: [
//         ProjectService,
//         TaskService,
//         CustomersService,
//         TranslateService,
//         { provide: ActivatedRoute, useValue: {} },
//         { provide: Router, useValue: {} }
//       ],
//       imports: [
//         FormsModule,
//         HttpClientTestingModule,
//         TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } })
//       ],
//       declarations: [ProjectTableComponent] // Include ProjectTableComponent in the declarations array
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProjectTableComponent);
//     component = fixture.componentInstance;
//     projectService = TestBed.inject(ProjectService);
//     taskService = TestBed.inject(TaskService);
//     customerService = TestBed.inject(CustomersService);
//     translateService = TestBed.inject(TranslateService);
//     router = TestBed.inject(Router);
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch tasks on initialization', () => {
//     const tasks = [{ taskId: 1, description: 'Task 1' }];
//     spyOn(taskService, 'getAll').and.returnValue(of(tasks));
//     spyOn(console, 'log');
//     fixture.detectChanges(); // Trigger ngOnInit
//     expect(component.tasks).toEqual(tasks);
//     expect(console.log).toHaveBeenCalledWith('tasks=', tasks);
//   });

//   it('should handle error when fetching projects', () => {
//     spyOn(projectService, 'getAll').and.returnValue(throwError(() => new Error('Error fetching projects')));
//     spyOn(translateService, 'get').and.returnValue(of({ Close: 'Close', unAuthorize: 'Unauthorized' }));
//     spyOn(Swal, 'fire');
//     spyOn(router, 'navigate');
//     fixture.detectChanges(); // Trigger ngOnInit
//     expect(Swal.fire).toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['../home']);
//     expect(component.loading).toBe(true);
//   });

//   // Add more test cases as needed for other methods and functionalities of ProjectTableComponent
// });