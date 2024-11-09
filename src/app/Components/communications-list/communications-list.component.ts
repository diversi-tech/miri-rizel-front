import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '@app/Services/communication.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-communications-list',
  standalone: true,
  imports: [NgFor, NgIf, ButtonModule, DatePipe],
  templateUrl: './communications-list.component.html',
  styleUrl: './communications-list.component.css'
})
export class CommunicationsListComponent implements OnInit {

  constructor(private communicationService: CommunicationService) {

  }
  ngOnInit(): void {
    this.initData()
  }

  list: any;

  initData() {
    this.communicationService.getAllPerId().subscribe(
      (data) => {
        console.log(data)
        this.list = data
      }
    )
  }

  deleteMessage(item: any) {
    console.log('View details for:', item);
    this.communicationService.deleteCommunication(item.communicationId).subscribe((data) => {
      console.log(data);
      this.initData()
    });
  }
}
