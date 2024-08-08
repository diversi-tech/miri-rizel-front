import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropilListComponent } from './propil-list.component';
import { CommunicationService } from '../../Services/communication.service';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Communication } from '../../Model/Communication';
import { NewComponent } from '../new/new.component';
import { AddTaskComponent } from '../add-task/add-task.component';

describe('PropilListComponent', () => {
  let component: PropilListComponent;
  let fixture: ComponentFixture<PropilListComponent>;
  let communicationService: CommunicationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatTabsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: CommunicationService,
          useValue: {
            readAll: () => of([{ communicationId: 1, relatedTo: { id: 1 } } as Communication])
          }
        }
      ]
    }).compileComponents();

    TestBed.overrideComponent(PropilListComponent, {
      set: {
        template: '<div></div>'
      }
    });

    TestBed.overrideComponent(NewComponent, {
      set: {
        template: '<div></div>'
      }
    });

    TestBed.overrideComponent(AddTaskComponent, {
      set: {
        template: '<div></div>'
      }
    });

    fixture = TestBed.createComponent(PropilListComponent);
    component = fixture.componentInstance;
    communicationService = TestBed.inject(CommunicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch communications on init', () => {
    spyOn(communicationService, 'readAll').and.callThrough();
    component.ngOnInit();
    expect(communicationService.readAll).toHaveBeenCalled();
    expect(component.communications).toEqual([{ communicationId: 1, relatedTo: { id: 1 } }]);
  });

  it('should apply Lead filter', () => {
    component.communications = [{ communicationId: 1, relatedTo: { id: 2 } } as Communication];
    component.applyFilter('Lead');
    expect(component.communicationsFilter).toEqual([{ communicationId: 1, relatedTo: { id: 2 } }]);
  });

  it('should apply Customer filter', () => {
    component.communications = [{ communicationId: 1, relatedTo: { id: 1 } } as Communication];
    component.applyFilter('Customer');
    expect(component.communicationsFilter).toEqual([{ communicationId: 1, relatedTo: { id: 1 } }]);
  });

  it('should show all communications on Show All filter', () => {
    component.communications = [
      { communicationId: 1, relatedTo: { id: 1 } } as Communication,
      { communicationId: 2, relatedTo: { id: 2 } } as Communication
    ];
    component.applyFilter('');
    expect(component.communicationsFilter.length).toBe(2);
  });

  it('should delete message', () => {
    // הגדרת רשימה התחלתית
    component.communications = [
      { communicationId: 1, relatedTo: { id: 1 } } as Communication,
      { communicationId: 2, relatedTo: { id: 2 } } as Communication
    ];

    // קריאה למתודת המחיקה
    component.deleteMessage({ communicationId: 1 });

    // עדכון התצוגה
    fixture.detectChanges();

    // בדיקה שאורך הרשימה אחרי המחיקה הוא 1
    expect(component.communications.length).toBe(1);

    // בדיקה שהתקשורת שנמחקה לא נמצאת ברשימה המנוקבת
    expect(component.communicationsFilter.length).toBe(0);
    expect(component.communications.find(c => c.communicationId === 1)).toBeUndefined();
  });

  it('should call popUpAddOrEdit when addTask or addCommunication is called', () => {
    spyOn(component, 'popUpAddOrEdit');
    component.addTask();
    expect(component.popUpAddOrEdit).toHaveBeenCalled();
    component.addCommunication();
    expect(component.popUpAddOrEdit).toHaveBeenCalled();
  });
});
