import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeadComponent } from './delete-lead.component';

describe('DeleteLeadComponent', () => {
  let component: DeleteLeadComponent;
  let fixture: ComponentFixture<DeleteLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLeadComponent]
    });
    fixture = TestBed.createComponent(DeleteLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
