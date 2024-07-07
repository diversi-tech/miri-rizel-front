import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent]
    });
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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

