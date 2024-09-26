import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Communication } from '@app/Model/Communication';
import { CommunicationService } from '@app/Services/communication.service';
import { NewComponent } from '@app/Components/new/new.component';
import { PropilComponent } from '@app/Components/propil/propil.component';
import { AddTaskComponent } from '@app/Components/add-task/add-task.component';
import Swal from 'sweetalert2';
import { GenericBourdComponent } from '@app/Components/generic-bourd/generic-bourd.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-propil-list',
  templateUrl: './propil-list.component.html',
  styleUrls: ['./propil-list.component.css'],
  standalone: true,
  imports: [TranslateModule,NgFor, NewComponent, PropilComponent, GenericBourdComponent, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule,
    MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe],

})
export class PropilListComponent implements OnInit {
  communications: Communication[] = [];
  communicationsFilter: Communication[] = [];
  @ViewChild(NewComponent) newComponentInstance!: NewComponent;
  constructor(private resolver: ComponentFactoryResolver, private communicationService: CommunicationService) { }

  ngOnInit(): void {    
    // this.fetchCommunications();
    this.refreshData()
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
  componentType!: Type<any>;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;


  addTask() {
    this.componentType = AddTaskComponent;
    this.popUpAddOrEdit();
  }

  addCommunication() {
    console.log("addcommunication :)");
    this.componentType = NewComponent;
    this.popUpAddOrEdit();
  }

  popUpAddOrEdit() {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.dataRefreshed.subscribe(() => {
            this.refreshData();})
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  // refreshData() {
  //   this.communicationService.readAll()
  //   .subscribe(
  //     (c: Array<Communication>) => {
  //       this.communications = c;
  //       this.communicationsFilter = c;
  //     })
  // }

  refreshData() {
    this.communicationService.readAll()
      .subscribe((c: Array<Communication>) => {
        // שמירה על רשימה חדשה עם ערכים ייחודיים של relatedId
        const uniqueRelatedIds = new Set(); // סט לשמירת ערכים ייחודיים
        this.communications = c.filter((communication) => {
          console.log(communication);
          console.log(communication.relatedId);
          console.log(uniqueRelatedIds);
          
          // אם relatedId עדיין לא בסט, הוסף אותו
          if (!uniqueRelatedIds.has(communication.relatedId)) {
            uniqueRelatedIds.add(communication.relatedId); // הוספת relatedId לסט
            return true; // שמור את האיבר
          }
          return false; // הסר את האיבר
        });
        this.communicationsFilter = this.communications; // עדכון הרשימה המסוננת
      });
  }
  


}