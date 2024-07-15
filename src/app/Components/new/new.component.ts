import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Communication } from '@app/Model/Communication';
import { Customer } from '@app/Model/Customers';
import { Lead } from '@app/Model/Lead';
import { RelatedToProject } from '@app/Model/RelatedToCode';
import { CommunicationService } from '@app/Services/communication.service';
import { CustomersService } from '@app/Services/customers.service';
import { LeadService } from '@app/Services/lead.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  @Output() messageSent = new EventEmitter<Communication>();
  newMessageForm: FormGroup;

  constructor(private leadservice: LeadService, private customerService: CustomersService, private formBuilder: FormBuilder, private communicationService: CommunicationService) {
    this.newMessageForm = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [''],
      relatedId: [null],
      relatedTo: [null]
    });
  }
  r!: RelatedToProject;
  sendMessage(): void {
    if (!this.newMessageForm.valid) {
      return;
    }
    if (this.newMessageForm.value.relatedTo == "Lead")
      this.r = { id: 2, description: "Lead" };
    else
      this.r = { id: 1, description: "Customer" };
    this.newMessageForm.value.relatedTo = this.r;
    this.newMessageForm.value.date = new Date();
    this.newMessageForm.value.type = this.newMessageForm.value.type;
    this.newMessageForm.value.communicationId = 0;
    this.newMessageForm.value.relatedId = this.newMessageForm.value.relatedId;
    this.communicationService.AddNewCommunication(this.newMessageForm.value).subscribe((response: Communication) => {
      this.messageSent.emit(response);
      this.newMessageForm.reset();
    });
  }

  showaddtask:boolean = false;
  namesl: Lead[] = [];
  namesc: Customer[] = [];

  showaddtaskf(){this.showaddtask=!this.showaddtask;}

  fetchNames(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption === 'Lead') {
      this.leadservice.getAllLeads().subscribe((names: Lead[]) => {
        this.namesl = names;
        this.namesc=[]
      });
    } else if (selectedOption === 'Customer') {
      this.customerService.GetAllCustomers().subscribe((names: Customer[]) => {
        this.namesc = names;
        this.namesl=[]
      });
    }
  }
}