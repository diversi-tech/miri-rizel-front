import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilseComponent } from './upload-filse.component';

describe('UploadFilseComponent', () => {
  let component: UploadFilseComponent;
  let fixture: ComponentFixture<UploadFilseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFilseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFilseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
