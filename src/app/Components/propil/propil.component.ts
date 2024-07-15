// import { Component, OnInit } from '@angular/core';
// import { Communication } from '@app/Model/Communication';
// import { CommunicationService } from '@app/Services/communication.service';

// @Component({
//   selector: 'app-propil',
//   templateUrl: './propil.component.html',
//   styleUrls: ['./propil.component.css']
// })
// export class PropilComponent implements OnInit {

//   constructor(private communicationService: CommunicationService){}

//   ngOnInit(): void {
//     this.communicationService.readAll().subscribe(res => {
//       this.cummunications = res;
//     })
//   }
  
//   cummunications: Communication[] = [];

// }



import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunicationService } from '@app/Services/communication.service';
import { Communication } from '@app/Model/Communication';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-propil',
  templateUrl: './propil.component.html',
  styleUrls: ['./propil.component.css']
})
export class PropilComponent implements OnInit {
  @Input() communication!: Communication;
  responses: Communication[] = [];
  responseForm!: FormGroup;
  
  @Output() deleteMessageEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.fetchResponses();
    this.initializeForm();
  }

  fetchResponses(): void {
    this.communicationService.readAll().subscribe(res => {
      this.responses = res.filter(comm => comm.relatedId === this.communication.communicationId);
    });
  }

  initializeForm(): void {
    this.responseForm = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [new Date()],
      relatedId: [this.communication.communicationId],
    });
  }

  sendResponse(): void {
    if (!this.responseForm.valid) {
      return;
    }
    this.communicationService.AddNewCommunication(this.responseForm.value).subscribe(() => {
      this.fetchResponses();
      this.responseForm.reset();
      this.responseForm.patchValue({ relatedId: this.communication.communicationId, date: new Date() });
    });
  }

  deleteMessage(message: any): void {
    this.communicationService.deleteCommunication(message.communicationId).subscribe(() => {
      this.deleteMessageEvent.emit(message);
    });
  }
}