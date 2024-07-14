// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Communication } from '@app/Model/Communication';
// import { Customer } from '@app/Model/Customers';
// import { Lead } from '@app/Model/Lead';
// import { User } from '@app/Model/User';
// import { CommunicationService } from '@app/Services/communication.service';
// import { UserService } from '@app/Services/user.service';
// import Swal from 'sweetalert2';
// import { RelatedToProject } from '@app/Model/RelatedToCode';


// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {

//   data!: Customer;
//   cummunications: Communication[] = [];
//   cummunications2: Communication[] = [];
//   flag: boolean = false;
//   chat!: FormGroup;

//   constructor(private formBuilder: FormBuilder, private userSrvice: UserService, private cummunication: CommunicationService) {
//     // Fetch chat messages from a service when the component initializes
//     this.fetchChatMessages();
//   }
//   ngOnInit(): void {
//     this.full();
//   }

//   full() {
//     this.chat = this.formBuilder.group({
//       details: [''],
//       communicationId: [0],
//       type: [''],
//       date: [new Date()],
//       relatedId: [this.data.customerId],
//     });
//   }

//   setData(data2: Customer) {
//     this.data = data2;
//     this.cummunication.readAll().subscribe(res => {
//       this.cummunications = res;
//       this.cummunications.forEach(c => {
//         console.log(c.relatedTo?.id);
//       })
//       this.cummunications.forEach(e => {
//         if(e.relatedTo!.id==Number(1))
//         this.cummunications2.push(e)
//       });
//       console.log( this.cummunications2);
//       this.flag = true;
//       // this.LeadToKnowInput = lead2;
//       // this.loadStatusUsers();
//       // this.fullForm();
//     });
//   }

//   fetchChatMessages(): void {
//     // Call a service to fetch chat messages
//     // Assign the retrieved messages to the chatMessages array
//   }

//   r: RelatedToProject = { id: 1, description: "Customer" };

//   sendMessage(): void {
//     // this.chat = this.formBuilder.group({
//     //   details: [''],
//     //   communicationId: [0],
//     //   type: [''],
//     //   date : [new Date()],
//     //   relatedTo : [''],
//     //   relatedId: [2],
//     //   userId: [this.data.customerId],
//     // });
//     // Add the new message to the chatMessages array

//     console.log(this.data);
//     console.log(this.chat.value);
//     this.chat.value.relatedTo = this.r;
//     this.cummunication.AddNewCommunication(this.chat.value).subscribe(r => {
//       this.flag = false;
//       this.cummunication.readAll().subscribe(res => {
//         console.log(res);

//         this.cummunications = res;
//         //if(this.data.createdDate==null)//customerer
//         // this.cummunications.forEach(c => {
//         //   if(!(c.userId==this.data.customerId))
//         //     this.cummunications.pop(number(c.communicationId))
//         // });
//         this.flag = true;
//         this.chat.reset();
//       })
//     })
//     // Call a service to send the message to the backend server
//   }

//   close() {
//     Swal.close();
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Communication } from '@app/Model/Communication';
import { Customer } from '@app/Model/Customers';
import { CommunicationService } from '@app/Services/communication.service';
import { UserService } from '@app/Services/user.service';
import Swal from 'sweetalert2';
import { RelatedToProject } from '@app/Model/RelatedToCode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  data!: Customer;
  communications: Communication[] = [];
  flag: boolean = false;
  chat!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private communicationService: CommunicationService
  ) {
    // Fetch chat messages from a service when the component initializes
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

  setData(customer: Customer): void {
    this.data = customer;
    this.communicationService.readAll().subscribe(res => {
      this.communications = res.filter(comm => comm.relatedId === this.data.customerId);
      this.flag = true;
    });
  }

  sendMessage(): void {
    if (!this.chat.valid) {
      return;
    }

    this.chat.patchValue({ relatedId: this.data.customerId });
    const r: RelatedToProject = { id: 1, description: "Customer" }; // Assuming you want to set relatedToId to 1
    this.chat.value.relatedTo = r;
    this.chat.value.data=new Date();
    this.chat.value.type=""
    this.chat.value.communicationId=0;
    this.communicationService.AddNewCommunication(this.chat.value).subscribe(() => {
      this.flag = false;
      this.fetchChatMessages(); // Reload communications after sending message
      this.chat.reset();
    });
  }

  fetchChatMessages(): void {
    // Call a service to fetch chat messages
    // Assign the retrieved messages to the chatMessages array
    this.communicationService.readAll().subscribe(res => {
      this.communications = res.filter(comm => comm.relatedId === this.data.customerId);
      this.flag = true;
    });
  }

  close(): void {
    Swal.close();
  }
}
