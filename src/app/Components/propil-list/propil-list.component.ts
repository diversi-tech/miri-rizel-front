import { Component, OnInit } from '@angular/core';
import { Communication } from '@app/Model/Communication';
import { CommunicationService } from '@app/Services/communication.service';

@Component({
  selector: 'app-propil-list',
  templateUrl: './propil-list.component.html',
  styleUrls: ['./propil-list.component.css']
})
export class PropilListComponent implements OnInit {
//   communications: Communication[] = [];

//   constructor(
//     private communicationService: CommunicationService
//   ) { }

//   ngOnInit(): void {
//     this.fetchCommunications();
//   }

//   fetchCommunications(): void {
//     this.communicationService.readAll().subscribe(res => {
//       this.communications = res
//     });
//   }
// }


communications: Communication[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.fetchCommunications();
  }

  fetchCommunications(): void {
    this.communicationService.readAll().subscribe(res => {
      this.communications = res;
    });
  }

  addNewMessage(newMessage: Communication): void {
    this.communications.push(newMessage);
  }
}