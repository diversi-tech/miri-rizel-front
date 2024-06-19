import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponentComponent } from './log-in-component.component';

describe('LogInComponentComponent', () => {
  let component: LogInComponentComponent;
  let fixture: ComponentFixture<LogInComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponentComponent]
    });
    fixture = TestBed.createComponent(LogInComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
