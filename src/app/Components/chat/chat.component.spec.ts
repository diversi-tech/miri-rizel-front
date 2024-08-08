import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatComponent } from './chat.component';
import { CommunicationService } from '../../Services/communication.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

// Mock service
class MockCommunicationService {
    readAll() {
        return of([{ relatedTo: { description: 'Lead' }, relatedId: 1 }]);
    }

    AddNewCommunication(data: any) {
        return of(({ success: true })); // Mock implementation can be adjusted if needed
    }
}

describe('ChatComponent', () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;
    let formBuilder: FormBuilder;
    let communicationService: CommunicationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientTestingModule],
            providers: [
                FormBuilder,
                { provide: CommunicationService, useClass: MockCommunicationService }
            ]
        }).compileComponents();

        TestBed.overrideComponent(ChatComponent, {
            set: {
                template: '<div></div>'
            }
        });

        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.inject(FormBuilder);
        communicationService = TestBed.inject(CommunicationService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        component.ngOnInit();
        expect(component.chat).toBeTruthy();
        expect(component.chat.controls['details']).toBeTruthy();
    });

    it('should set data and flag based on input in setData method', () => {
        spyOn(communicationService, 'readAll').and.returnValue(of([]));
        component.setData({ firstName: 'John' } as any, 'Lead', 1);
        expect(component.flag).toBeTruthy();
        expect(component.firstName).toBe('John');
    });
    
    it('should fetch chat messages and set communications in fetchChatMessages method', () => {
        const mockCommunicationData = [{ relatedTo: { description: 'Lead' }, relatedId: 1 }];
        spyOn(communicationService, 'readAll').and.returnValue(of(mockCommunicationData));
    
        component.string = 'Lead';
        component.id2 = 1;
    
        component.fetchChatMessages();
        fixture.detectChanges();
    
        expect(component.communications.length).toBe(mockCommunicationData.length);
        expect(component.flag).toBeTruthy();
        expect(component.communications[0]).toEqual(mockCommunicationData[0]);
    });
    
    

    it('should close Swal on close method call', () => {
        spyOn(Swal, 'close');
        component.close();
        expect(Swal.close).toHaveBeenCalled();
    });
});
