import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommunicationService } from '@app/Services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { NewComponent } from '../new/new.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-communications-list',
  standalone: true,
  imports: [NgFor, NgIf, ButtonModule, DatePipe, TranslateModule],
  templateUrl: './communications-list.component.html',
  styleUrl: './communications-list.component.css'
})
export class CommunicationsListComponent implements OnInit {

  constructor(private communicationService: CommunicationService, private spinner: NgxSpinnerService, private resolver: ComponentFactoryResolver) {

  }
  ngOnInit(): void {
    this.initData()
  }

  componentType!: Type<any>;

  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
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
    this.spinner.show
    this.communicationService.deleteCommunication(item.communicationId).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide()
      });
  }

  applyFilter(str: string) {
    if (str == "Customer")
      console.log("Customer");
    else if (str == "Lead")
      console.log("Lead");
    else
      this.initData()
  }

  addCommunication() {
    this.componentType = NewComponent;
    this.popUpAddOrEdit("");
  }

  popUpAddOrEdit(title: string) {
    debugger
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);

          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.dataRefreshed.subscribe(() => {
          })
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }
}
