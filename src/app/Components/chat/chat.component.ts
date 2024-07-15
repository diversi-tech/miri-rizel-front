import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Communication } from '@app/Model/Communication';
import { Customer } from '@app/Model/Customers';
import { CommunicationService } from '@app/Services/communication.service';
import Swal from 'sweetalert2';
import { RelatedToProject } from '@app/Model/RelatedToCode';
import { Lead } from '@app/Model/Lead';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  data!: Customer | Lead;
  communications: Communication[] = [];
  flag: boolean = false;
  chat!: FormGroup;
  string!: string;
  id2!: Number

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService
  ) {
    this.fetchChatMessages();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.chat = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [new Date()],
      relatedId: [null],
    });
  }

  r!: RelatedToProject;
  setData(any: Lead | Customer, s: string, id: Number): void {
    this.data = any;
    this.string = s;
    if (s == "Lead") {
      this.communicationService.readAll().subscribe(res => {
        this.communications = res.filter(comm => comm.relatedId === id && comm.relatedTo?.id==2);
        this.flag = true;
        this.r = { id: 2, description: "Lead" };
        this.chat.patchValue({ relatedId: id });
        this.id2 = id;
      });
    }
    else {
      this.communicationService.readAll().subscribe(res => {
        this.communications = res.filter(comm => comm.relatedId === id && comm.relatedTo?.id==1);
        this.flag = true;
        this.r = { id: 1, description: "Customer" };
        this.chat.patchValue({ relatedId: id });
        this.id2 = id;
      });
    }
  }

  sendMessage(): void {
    if (!this.chat.valid) {
      return;
    }
    if (this.string == "Lead")
      this.r = { id: 2, description: "Lead" };
    else
      this.r = { id: 1, description: "Customer" };
    this.chat.patchValue({ relatedId: this.id2 });
    this.chat.value.relatedTo = this.r;
    this.chat.value.date = new Date();
    this.chat.value.type = ""
    this.chat.value.communicationId = 0; 
    this.communicationService.AddNewCommunication(this.chat.value).subscribe(() => {
      this.flag = false;
      this.fetchChatMessages();
      this.chat.reset();
    });
  }

  fetchChatMessages(): void {
    this.communicationService.readAll().subscribe(res => {
      this.communications = res.filter(comm => comm.relatedTo?.description === this.string && comm.relatedId === this.id2);
      this.flag = true;
    });
  }

  close(): void {
    Swal.close();
  }
}
