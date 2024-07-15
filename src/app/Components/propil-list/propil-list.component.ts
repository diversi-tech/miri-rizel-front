// import { Component, OnInit } from '@angular/core';
// import { Communication } from '@app/Model/Communication';
// import { CommunicationService } from '@app/Services/communication.service';

// @Component({
//   selector: 'app-propil-list',
//   templateUrl: './propil-list.component.html',
//   styleUrls: ['./propil-list.component.css']
// })
// export class PropilListComponent implements OnInit {
//   communications: Communication[] = [];
//   communicationsFilter: Communication[] = [];

//   constructor(private communicationService: CommunicationService) { }

//   ngOnInit(): void {
//     this.fetchCommunications();
//   }

//   fetchCommunications(): void {
//     this.communicationService.readAll().subscribe(res => {
//       this.communications = res;
//       this.communicationsFilter = res;
//     });
//   }

//   addNewMessage(newMessage: Communication): void {
//     this.communications.push(newMessage);
//   }

//   applyFilter(filterType: string): void {
//     this.communicationsFilter=this.communications;
//     if (filterType === 'Lead') {
//       this.communicationsFilter = this.communications.filter(comm => comm.relatedTo?.id === 2);
//     } else if (filterType === 'Customer') {
//       this.communicationsFilter = this.communications.filter(comm => comm.relatedTo?.id === 1);
//     } else {
//       this.communicationsFilter = [...this.communications];
//     }
//   }


  
// }

import { Component, OnInit } from '@angular/core';
import { Communication } from '@app/Model/Communication';
import { CommunicationService } from '@app/Services/communication.service';

@Component({
  selector: 'app-propil-list',
  templateUrl: './propil-list.component.html',
  styleUrls: ['./propil-list.component.css']
})
export class PropilListComponent implements OnInit {
  communications: Communication[] = [];
  communicationsFilter: Communication[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.fetchCommunications();
  }

  fetchCommunications(): void {
    this.communicationService.readAll().subscribe(res => {
      this.communications = res;
      this.communicationsFilter = res;
    });
  }

  addNewMessage(newMessage: Communication): void {
    this.communications.push(newMessage);
    this.fetchCommunications()
  }
  
  applyFilter(filterType: string): void {
    this.communicationsFilter = this.communications;
    if (filterType === 'Lead') {
      this.communicationsFilter = this.communications.filter(comm => comm.relatedTo?.id === 2);
    } else if (filterType === 'Customer') {
      this.communicationsFilter = this.communications.filter(comm => comm.relatedTo?.id === 1);
    } else {
      this.communicationsFilter = [...this.communications];
    }
  }
  
  deleteMessage(message: any): void {
    this.communications = this.communications.filter(comm => comm.communicationId !== message.communicationId);
    this.communicationsFilter = this.communicationsFilter.filter(comm => comm.communicationId !== message.communicationId);
  }

  onDeleteMessageFromChild(message: any): void {
    this.deleteMessage(message); // Call the delete function when the event is emitted from the child component
  }
}