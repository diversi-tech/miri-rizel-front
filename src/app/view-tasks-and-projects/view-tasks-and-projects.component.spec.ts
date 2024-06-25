import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasksAndProjectsComponent } from './view-tasks-and-projects.component';

describe('ViewTasksAndProjectsComponent', () => {
  let component: ViewTasksAndProjectsComponent;
  let fixture: ComponentFixture<ViewTasksAndProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTasksAndProjectsComponent]
    });
    fixture = TestBed.createComponent(ViewTasksAndProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
