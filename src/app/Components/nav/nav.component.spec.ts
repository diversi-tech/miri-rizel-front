import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD:src/app/Components/sign-up/sign-up.component.spec.ts
    imports: [SignUpComponent]
});
    fixture = TestBed.createComponent(SignUpComponent);
=======
      declarations: [NavComponent]
    });
    fixture = TestBed.createComponent(NavComponent);
>>>>>>> 76c1a05487c8920dbfdbbfe6cb73fc6273a83e43:src/app/Components/nav/nav.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
