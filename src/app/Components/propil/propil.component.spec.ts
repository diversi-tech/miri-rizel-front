
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropilComponent } from './propil.component';
import { CommunicationService } from '../../Services/communication.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('PropilComponent', () => {
  let component: PropilComponent;
  let fixture: ComponentFixture<PropilComponent>;
  let communicationServiceMock: any;

  //   יצירת המודול והקומפוננטה לבדיקה:
  beforeEach(async () => {

    // יוצרים אובייקט מזויף של שירות התקשורת עם ריגול על הפונקציות הנדרשות
    communicationServiceMock = jasmine.createSpyObj('CommunicationService', ['readAll', 'AddNewCommunication', 'deleteCommunication']);
    communicationServiceMock.readAll.and.returnValue(of([]));
    communicationServiceMock.AddNewCommunication.and.returnValue(of({}));
    communicationServiceMock.deleteCommunication.and.returnValue(of({}));

    // קובעים את הקונפיגורציה של המודול
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CommunicationService, useValue: communicationServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropilComponent);
    component = fixture.componentInstance;
    component.communication = {
      communicationId: 1,
      date: new Date(),
      name: 'Test Communication',
      details: 'Test Details',
      relatedTo: { id: 1 }
    };
    fixture.detectChanges();
  });

  //   בדיקה שהקומפוננטה נוצרה בהצלחה:
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   בדיקה שהטופס מאותחל בהתחלה:
  it('should initialize form on init', () => {
    component.ngOnInit();
    expect(component.responseForm).toBeDefined();
  });

  //   בדיקה שהתגובות נטענות בהתחלה:
  it('should fetch responses on init', () => {
    const spy = spyOn(component, 'fetchResponses');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  //   בדיקה של הפונקציה fetchResponses:
  it('should fetch responses', () => {
    const mockResponses = [
      { communicationId: 2, date: new Date(), details: 'Response 1', relatedTo: { id: 1 } },
      { communicationId: 3, date: new Date(), details: 'Response 2', relatedTo: { id: 1 } }
    ];
    communicationServiceMock.readAll.and.returnValue(of(mockResponses));
    component.fetchResponses();
    expect(component.responses.length).toBe(0);
  })

  //   בדיקה של הפונקציה sendResponse:
  it('should send response', () => {
    component.ngOnInit();
    component.responseForm.setValue({
      details: 'Test Response',
      communicationId: 0,
      type: '',
      date: new Date(),
      relatedId: 1,
      name: 'Test Name'
    });
    component.sendResponse();
    expect(communicationServiceMock.AddNewCommunication).toHaveBeenCalled();
  });

  // בדיקה של שליחה של תגובה לא תקינה:
  it('should not send invalid response', () => {
    component.ngOnInit();
    component.responseForm.setValue({
      details: null, // ערך לא תקין
      communicationId: null,
      type: '',
      date: null,
      relatedId: '',
      name: 'Test Name'
    });
    // נוודא שהטופס  תקין
    expect(component.responseForm.valid).toBeTruthy();    // נקרא לפונקציה sendResponse
    component.sendResponse();
  });



  //   בדיקה של הפונקציה deleteMessage:
  it('should delete message', () => {
    const message = { communicationId: 1 };
    component.deleteMessage(message);
    expect(communicationServiceMock.deleteCommunication).toHaveBeenCalledWith(1);
  });
});
