import { Component, ComponentFactoryResolver, EventEmitter, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Communication } from '@app/Model/Communication';
import { Customer } from '@app/Model/Customers';
import { Lead } from '@app/Model/Lead';
import { RelatedToProject } from '@app/Model/RelatedToCode';
import { CommunicationService } from '@app/Services/communication.service';
import { CustomersService } from '@app/Services/customers.service';
import { LeadService } from '@app/Services/lead.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  @Output() messageSent = new EventEmitter<Communication>();
  newMessageForm: FormGroup;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private leadservice: LeadService, private customerService: CustomersService, private formBuilder: FormBuilder, private communicationService: CommunicationService) {
    this.newMessageForm = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [''],
      relatedId: [null],
      relatedTo: [null],
      name: []
    });
  }
  r!: RelatedToProject;
  firstName!:Lead | Customer;

  sendMessage(): void {
    if (!this.newMessageForm.valid) {
      return;
    }
    if (this.newMessageForm.value.relatedTo == "Lead") {
      this.r = { id: 2, description: "Lead" };
      this.namesl.forEach(e => {
        if(e.leadId==this.newMessageForm.value.relatedId)
          this.firstName=e;
      });
    }
    else {
      this.r = { id: 1, description: "Customer" };
      this.namesc.forEach(e => {
        if(e.customerId==this.newMessageForm.value.relatedId)
          this.firstName=e;
      });
    }    
    this.newMessageForm.value.relatedTo = this.r;
    this.newMessageForm.value.date = new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60000);
    this.newMessageForm.value.type = this.newMessageForm.value.type;
    this.newMessageForm.value.communicationId = 0;
    this.newMessageForm.value.name = this.firstName.firstName;
    this.newMessageForm.value.relatedId = this.newMessageForm.value.relatedId;
    this.communicationService.AddNewCommunication(this.newMessageForm.value).subscribe((response: Communication) => {
      this.messageSent.emit(response);
      this.newMessageForm.reset();
    });
  }

  showaddtask: boolean = false;
  namesl: Lead[] = [];
  namesc: Customer[] = [];

  componentType!: Type<any>;
  showaddtaskf() {
    // this.showaddtask=!this.showaddtask;
    this.componentType = AddTaskComponent;
    this.popUp("Add Task");
  }

  popUp(title: string) {
    Swal.fire({
      title: title,
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  fetchNames(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption === 'Lead') {
      this.leadservice.getAllLeads().subscribe((names: Lead[]) => {
        this.namesl = names;
        this.namesc = []
      });
    } else if (selectedOption === 'Customer') {
      this.customerService.GetAllCustomers().subscribe((names: Customer[]) => {
        this.namesc = names;
        this.namesl = []
      });
    }
  }
}




