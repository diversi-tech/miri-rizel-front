import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCodeDialogComponent } from '@app/Components/auth-code-dialog/auth-code-dialog.component';

describe('AuthCodeDialogComponent', () => {
  let component: AuthCodeDialogComponent;
  let fixture: ComponentFixture<AuthCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
