import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Communication } from '@app/Model/Communication';
import { RelatedToProject } from '@app/Model/RelatedToCode';
import { CommunicationService } from '@app/Services/communication.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  @Output() messageSent = new EventEmitter<Communication>();
  newMessageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private communicationService: CommunicationService) {
    this.newMessageForm = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [new Date()],
      relatedId: [null],
    });
  }

  sendMessage(): void {
    if (!this.newMessageForm.valid) {
      return;
    }
    console.log(this.newMessageForm.value);
    const r: RelatedToProject = { id: 1, description: "Customer" }; // Assuming you want to set relatedToId to 1
    this.newMessageForm.value.relatedTo = r;
    this.newMessageForm.value.data = new Date();
    this.newMessageForm.value.type=""
    this.newMessageForm.value.communicationId=0;
    this.newMessageForm.value.relatedId=this.newMessageForm.value.relatedId;
    console.log(this.newMessageForm.value);
    this.communicationService.AddNewCommunication(this.newMessageForm.value).subscribe((response: Communication) => {
      this.messageSent.emit(response);
      this.newMessageForm.reset();
    });
  }
}