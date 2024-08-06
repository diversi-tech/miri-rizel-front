import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { ProjectService } from 'src/app/Services/project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let userService: jasmine.SpyObj<UserService>;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask', 'updateTask', 'getTaskById', 'getAllStatus', 'getAllPriorities']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAll']);
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ProjectService, useValue: projectServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;

    userService.getAll.and.returnValue(of([]));
    taskService.getAllStatus.and.returnValue(of([]));
    taskService.getAllPriorities.and.returnValue(of([]));
    projectService.getAll.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userService.getAll).toHaveBeenCalled();
  });

  it('should load statuses on init', () => {
    expect(taskService.getAllStatus).toHaveBeenCalled();
  });

  it('should load priorities on init', () => {
    expect(taskService.getAllPriorities).toHaveBeenCalled();
  });

  it('should load projects on init', () => {
    expect(projectService.getAll).toHaveBeenCalled();
  });

  // בדיקה לשמירת משימה חדשה
  it('should call addTask on submit if form is valid and not edit mode', () => {
    component.taskForm.setValue({
      taskId: '',
      createdDate: '',
      googleId: '',
      title: 'Test Task',
      description: 'Test Description',
      status: 'Test Status',
      priority: 'Test Priority',
      dueDate: new Date(),
      assignedTo: 'Test User',
      project: 'Test Project',
    });

    taskService.addTask.and.returnValue(of({}));

    component.onSubmit();

    expect(taskService.addTask).toHaveBeenCalled();
  });

  // בדיקה לעדכון משימה קיימת
  it('should call updateTask on submit if form is valid and in edit mode', () => {
    component.isEdit = true;
    component.taskForm.setValue({
      taskId: '1',
      createdDate: '2023-01-01',
      googleId: '123',
      title: 'Test Task',
      description: 'Test Description',
      status: 'Test Status',
      priority: 'Test Priority',
      dueDate: new Date(),
      assignedTo: 'Test User',
      project: 'Test Project',
    });

    taskService.updateTask.and.returnValue(of({}));

    component.onSubmit();

    expect(taskService.updateTask).toHaveBeenCalled();
  });
});
