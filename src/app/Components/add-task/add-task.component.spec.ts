// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AddTaskComponent } from './add-task.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { TaskService } from 'src/app/Services/task.service';
// import { UserService } from 'src/app/Services/user.service';
// import { ProjectService } from 'src/app/Services/project.service';
// import { Location } from '@angular/common';
// import { of } from 'rxjs';
// import { User } from 'src/app/Model/User';
// import { Project } from 'src/app/Model/Project';
// import { MatFormFieldModule } from '@angular/material/form-field';

// describe('AddTaskComponent', () => {
//     let component: AddTaskComponent;
//     let fixture: ComponentFixture<AddTaskComponent>;
//     let mockUserService: jasmine.SpyObj<UserService>;
//     let mockTaskService: jasmine.SpyObj<TaskService>;
//     let mockProjectService: jasmine.SpyObj<ProjectService>;
//     let mockMatDialog: jasmine.SpyObj<MatDialog>;
//     let mockRouter: jasmine.SpyObj<Router>;
//     let mockLocation: jasmine.SpyObj<Location>;

//     beforeEach(async () => {
//         mockUserService = jasmine.createSpyObj('UserService', ['getAll']);
//         mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById', 'addTask', 'updateTask']);
//         mockProjectService = jasmine.createSpyObj('ProjectService', ['getAll']);
//         mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
//         mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//         mockLocation = jasmine.createSpyObj('Location', ['go']);

//         await TestBed.configureTestingModule({
//             declarations: [AddTaskComponent],
//             imports: [ReactiveFormsModule, MatFormFieldModule],
//             providers: [
//                 FormBuilder,
//                 { provide: UserService, useValue: mockUserService },
//                 { provide: TaskService, useValue: mockTaskService },
//                 { provide: ProjectService, useValue: mockProjectService },
//                 { provide: MatDialog, useValue: mockMatDialog },
//                 { provide: Router, useValue: mockRouter },
//                 { provide: ActivatedRoute, useValue: { snapshot: { params: { id: null } } } },
//                 { provide: Location, useValue: mockLocation }
//             ]
//         })
//             .compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(AddTaskComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should initialize form with empty values', () => {
//         expect(component.taskForm.value).toEqual({
//             title: '',
//             description: '',
//             status: '',
//             priority: '',
//             dueDate: null,
//             assignedTo: null,
//             project: null
//         });
//     })

//     it('should initialize form with required fields', () => {
//         expect(component.taskForm.valid).toBeFalsy();
//         expect(component.taskForm.controls['title'].valid).toBeFalsy();
//         expect(component.taskForm.controls['status'].valid).toBeFalsy();
//         expect(component.taskForm.controls['priority'].valid).toBeFalsy();
//         expect(component.taskForm.controls['dueDate'].valid).toBeFalsy();
//         expect(component.taskForm.controls['assignedTo'].valid).toBeFalsy();
//         expect(component.taskForm.controls['project'].valid).toBeFalsy();
//     });

//     it('should call userService.getAll() on ngOnInit', () => {
//         const mockUsers: User[] = [
//             { userId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '', role: 1 },
//             { userId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: '', role: 2 }
//         ];

//         mockUserService.getAll.and.returnValue(of(mockUsers));

//         component.ngOnInit();

//         expect(mockUserService.getAll).toHaveBeenCalled();
//         expect(component.users).toEqual(mockUsers);
//         expect(component.filteredUsers).toEqual(mockUsers);
//     });

//     it('should load task data on ngOnInit when taskId is present', () => {
//         const mockTaskId = 1;
//         const mockTask = {
//             taskId: 1,
//             title: 'Sample Task',
//             description: 'Sample Description',
//             status: 'Pending',
//             priority: 'High',
//             dueDate: new Date(),
//             assignedTo: { userId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '', role: 1 },
//             project: { projectId: 1, name: 'Sample Project' }
//         };

//         mockTaskService.getTaskById.and.returnValue(of(mockTask));

//         TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { params: { id: mockTaskId } } } });

//         component.ngOnInit();

//         expect(mockTaskService.getTaskById).toHaveBeenCalledWith(mockTaskId);
//         expect(component.isEdit).toBeTrue();
//         expect(component.titlePage).toBe('עריכת משימה');
//         expect(component.taskForm.value).toEqual({
//             taskId: mockTask.taskId,
//             title: mockTask.title,
//             description: mockTask.description,
//             status: mockTask.status,
//             priority: mockTask.priority,
//             dueDate: mockTask.dueDate,
//             assignedTo: mockTask.assignedTo,
//             project: mockTask.project
//         });
//     });

//     it('should set newTask and call taskService.addTask() on form submit when not editing', () => {
//         const mockTask = {
//             title: 'New Task',
//             description: 'Sample Description',
//             status: 'Pending',
//             priority: 'High',
//             dueDate: new Date(),
//             assignedTo: { userId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '', role: 1 },
//             project: { projectId: 1, name: 'Sample Project' }
//         };

//         component.taskForm.patchValue(mockTask);
//         component.isEdit = false;

//         mockTaskService.addTask.and.returnValue(of(true));

//         component.onSubmit();

//         // expect(mockTaskService.addTask).toHaveBeenCalledWith(mockTask);
//         expect(component.dataRefreshed.emit).toHaveBeenCalled();
//         expect(mockRouter.navigate).toHaveBeenCalledWith(['/task-board']);
//         expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.anything(), {
//             data: {
//                 title: 'המשימה נוספה בהצלחה',
//                 context: mockTask.title,
//                 buttonText: 'סגור'
//             }
//         });
//         expect(mockLocation.go).toHaveBeenCalledWith(mockLocation.path());
//     });

//     it('should call taskService.updateTask() on form submit when editing', () => {
//         const mockTask = {
//             taskId: 1,
//             title: 'Updated Task',
//             description: 'Updated Description',
//             status: 'Completed',
//             priority: 'Low',
//             dueDate: new Date(),
//             assignedTo: { userId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: '', role: 2 },
//             project: { projectId: 2, name: 'Updated Project' }
//         };

//         component.taskForm.patchValue(mockTask);
//         component.isEdit = true;

//         mockTaskService.updateTask.and.returnValue(of(true));

//         component.onSubmit();

//         // expect(mockTaskService.updateTask).toHaveBeenCalledWith(mockTask);
//         expect(component.dataRefreshed.emit).toHaveBeenCalled();
//         expect(mockRouter.navigate).toHaveBeenCalledWith(['/task-board']);
//         expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.anything(), {
//             data: {
//                 title: 'המשימה עודכנה בהצלחה',
//                 context: mockTask.title,
//                 buttonText: 'סגור'
//             }
//         });
//         expect(mockLocation.go).toHaveBeenCalledWith(mockLocation.path());
//     });
// });

