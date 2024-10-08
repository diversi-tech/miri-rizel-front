import {
  Component,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { Lead } from 'src/app/Model/Lead';
import { GenericBourdComponent } from '@app/Components/generic-bourd/generic-bourd.component';
import { LeadService } from 'src/app/Services/lead.service';
import Swal from 'sweetalert2';
import { EditLeadComponent } from 'src/app/Components/Lead-components/edit-lead/edit-lead.component';
import { DialogComponent } from '@app/Components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '@app/Components/chat/chat.component';
import { AddLeadComponent } from 'src/app/Components/Lead-components/add-lead/add-lead.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommunicationService } from '@app/Services/communication.service';
import { CustomersService } from '@app/Services/customers.service';
import { Communication } from '@app/Model/Communication';
import { RelatedToProject } from '@app/Model/RelatedToCode';
import { Customer } from '@app/Model/Customer';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.css'],
  standalone: true,
  imports: [GenericBourdComponent],
})
export class ListLeadsComponent {
  Leads: Lead[] = [];
  projects: Project[] = [];
  loading: boolean = true;
  componentType!: Type<any>;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;
  constructor(
    private dialog: MatDialog,
    private leadService: LeadService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService,
    private communicationS: CommunicationService,
    private CustomersServiceS: CustomersService
  ) { }

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads(): void {
    this.leadService.getAllLeads().subscribe((res) => {
      this.Leads = res;
      this.loading = false;
    });
  }

  onEditLead(Lead: Lead) {
    this.componentType = EditLeadComponent;
    this.popUpAddOrEdit(Lead.leadId);
  }

  communicationaaaa: Communication[] = []
  leng: number = 0
  onDeleteLead(lead: Lead) {
    this.communicationS.getbyIdLCommunication(lead.leadId).subscribe(res => {
      console.log(res);
      this.communicationaaaa = res
      console.log(this.communicationaaaa.length);
      if (this.communicationaaaa.length == 0)
        this.leadService.deleteLead(lead.leadId).subscribe((res: any) => {
          this.loadLeads();
        })
      else {
        this.leng = this.communicationaaaa.length;
        this.communicationaaaa.forEach(e => {
          if (e.communicationId != null) {
            this.communicationS.deleteCommunication(e.communicationId).subscribe((res
            ) => {
              console.log(res), this.leng -= 1, console.log(this.leng); if (this.leng == 0)
                this.leadService.deleteLead(lead.leadId).subscribe((res: any) => {
                  this.loadLeads();
                })
            })
          }
        })
      }
    })
  }

  addLead() {
    this.componentType = AddLeadComponent;
    let title: string = '';
    //this.translate.get("AddLead").subscribe(tranlation=> title=tranlation);
    this.popUpAddOrEdit();
  }

  popUpAddOrEdit(l?: Number) {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          if (container == undefined) console.log(',l;,');
          const factory = this.resolver.resolveComponentFactory(
            this.componentType
          );
          const componentRef = this.popupContainer.createComponent(factory);
          if (l != null && l != undefined) componentRef.instance.setData(l);
          componentRef.instance.dataRefreshed.subscribe(() => {
            this.refreshData();
          });
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  refreshData() {
    this.leadService.getAllLeads().subscribe((Leads: Array<Lead>) => {
      this.Leads = Leads;
      this.loading = false;
    });
  }

  documentation(l: Lead) {
    this.componentType = ChatComponent;
    this.popUpPropil(`Communication ${l.firstName}`, l, 'Lead', l.leadId);
  }

  popupOpen = false;

  popUpPropil(title: string, l: Lead, s: String, id: Number) {
    // this.flag = false;
    this.popupOpen = true; // Set popupOpen to true when the pop-up is opened
    Swal.fire({
      title: title,
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(
            this.componentType
          );
          const componentRef = this.popupContainer.createComponent(factory);
          if (l != null && l != undefined)
            componentRef.instance.setData(l, s, id);
          container.appendChild(componentRef.location.nativeElement);
        }
      },
      didClose: () => {
        this.popupOpen = false; // Set popupOpen to false when the pop-up is closed
      },
    });
    this.logNumbersWhilePopupOpen();
  }

  logNumbersWhilePopupOpen() {
    let counter = 0;
    const interval = setInterval(() => {
      if (this.popupOpen) {
        counter++;
      } else {
        clearInterval(interval); // Stop logging numbers when the pop-up is closed
        // this.custService.GetCustomerById(this.cus.customerId).subscribe(res=>{this.cus=res,this.flag=true})
      }
    }, 1000); // Log every second
  }

  r: RelatedToProject = { id: 1, description: "Customer" };
  communicationNew: Communication = {
    communicationId: 0, type: '', date: new Date(),
    details: '', relatedTo: new Object(), relatedId: 0, name: ''
  };

  communicationaaaa2: Communication[] = []
  cUSTOMER: Customer[] = []
  leng2: number = 0
  max: number = 0
  communicationList: Communication[] = []

  replaceStateToCustomer(lead: Lead) {
    console.log("replace2 Function:)");
    var relatedId: number;
    // המרת ליד ללקוח
    this.leadService.replaceToCustomer(lead).subscribe((res: any) => {
      console.log(res);
      // שליפה של כל התיעודים של הליד
      this.communicationS.getbyIdLCommunication(lead.leadId).subscribe((list => {
        if (list) {
          console.log("list", list);
          this.communicationList = list
          // מזהה לקוח החדש שנוצר
          relatedId = res.Id
          // העברה של התיעוד ללקוח
          if (this.communicationList.length > 0) {
            this.communicationList.forEach((communication) => {
              console.log(communication);
              this.communicationS.updateCommunication(communication.communicationId!, this.r.id, relatedId).subscribe();
            });
          }
        }
      }))
      this.refreshData();

      this.translate.get(["replaceLeadSuccses", "GoToTheCustomerPage", 'Approve']).subscribe((translations) => {
        Swal.fire({
          icon: "success",
          title: translations['replaceLeadSuccses'],
          //text: translations['AddTaskToGoogle'],
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: translations['GoToTheCustomerPage'],
          denyButtonText: translations['Approve'],
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/customer'])
          }
          else {
            this.refreshData();
          }
        })
      })

    },
      (err) => {
        console.log(err);
      })
  }

  // replaceStateToCustomer(lead: Lead) {
  //   console.log("replace Function:)");
  //   this.CustomersServiceS.GetAllCustomers().subscribe((res: any) => {
  //     this.cUSTOMER = res
  //     console.log("this.cUSTOMER", this.cUSTOMER);
  //     if (this.cUSTOMER.length != 0)
  //       this.max = this.cUSTOMER[this.cUSTOMER.length - 1].customerId;
  //     else this.max = 0
  //     console.log("max", this.max);
  //     this.communicationS.getbyIdLCommunication(lead.leadId).subscribe(res => {
  //       this.communicationaaaa2 = res
  //       console.log(this.communicationaaaa2.length);
  //       if (this.communicationaaaa2.length != 0) {
  //         this.leng = this.communicationaaaa2.length;
  //         this.communicationaaaa2.forEach(e => {
  //           if (e.communicationId != null) {
  //             this.communicationNew.relatedTo = this.r;
  //             this.communicationNew.date = e.date
  //             this.communicationNew.type = e.type
  //             this.communicationNew.communicationId = 0
  //             this.communicationNew.name = e.name
  //             this.communicationNew.details = e.details
  //             this.communicationNew.relatedId = this.max + 1;
  //             console.log(this.communicationNew);
  //             console.log("i am here!!!");

  //             this.leadService.replaceToCustomer(lead).subscribe(customer => {
  //               console.log("customer", customer);
  //               this.refreshData();
  //               this.translate.get(["replaceLeadSuccses", "GoToTheCustomerPage", 'Approve']).subscribe(translations =>
  //                 Swal.fire({
  //                   icon: "success",
  //                   title: translations['replaceLeadSuccses'],
  //                   //text: translations['AddTaskToGoogle'],
  //                   showDenyButton: true,
  //                   showCancelButton: false,
  //                   confirmButtonText: translations['GoToTheCustomerPage'],
  //                   denyButtonText: translations['Approve'],

  //                 }).then((result) => {
  //                   if (result.isConfirmed) {
  //                     // this.scheduleMeeting(response.taskId)
  //                     this.router.navigate(['/customer'])
  //                     // } else if (result.isDenied) {
  //                     //   Swal.fire(translations['replaceLeadSuccses'], "", "info");
  //                   }
  //                   else {
  //                     this.refreshData();
  //                   }
  //                 }))
  //             })

  //             this.communicationS.AddNewCommunication(this.communicationNew).subscribe((response: Communication) => {
  //               console.log("response", response);

  //               if (e.communicationId != null) this.communicationS.deleteCommunication(e.communicationId).subscribe(data =>
  //                 this.leadService.replaceToCustomer(lead).subscribe(customer => {
  //                   this.refreshData();
  //                   this.translate.get(["replaceLeadSuccses", "GoToTheCustomerPage", 'Approve']).subscribe(translations =>
  //                     Swal.fire({
  //                       icon: "success",
  //                       title: translations['replaceLeadSuccses'],
  //                       //text: translations['AddTaskToGoogle'],
  //                       showDenyButton: true,
  //                       showCancelButton: false,
  //                       confirmButtonText: translations['GoToTheCustomerPage'],
  //                       denyButtonText: translations['Approve'],

  //                     }).then((result) => {
  //                       if (result.isConfirmed) {
  //                         // this.scheduleMeeting(response.taskId)
  //                         this.router.navigate(['/customer'])
  //                         // } else if (result.isDenied) {
  //                         //   Swal.fire(translations['replaceLeadSuccses'], "", "info");
  //                       }
  //                       else {
  //                         this.refreshData();
  //                       }
  //                     }))
  //                 }
  //                 )
  //               )
  //             });
  //           }
  //         })
  //       }
  //       // במקרה שאין לו תיעוד
  //       else {
  //         this.leadService.replaceToCustomer(lead).subscribe(customer => {
  //           this.refreshData();
  //           this.translate.get(["replaceLeadSuccses", "GoToTheCustomerPage", 'Approve']).subscribe(translations =>
  //             Swal.fire({
  //               icon: "success",
  //               title: translations['replaceLeadSuccses'],
  //               //text: translations['AddTaskToGoogle'],
  //               showDenyButton: true,
  //               showCancelButton: false,
  //               confirmButtonText: translations['GoToTheCustomerPage'],
  //               denyButtonText: translations['Approve'],

  //             }).then((result) => {
  //               if (result.isConfirmed) {
  //                 this.router.navigate(['/customer'])
  //               }
  //               else {
  //                 this.refreshData();
  //               }
  //             }))
  //         }
  //         )
  //       }
  //     })
  //   })

  // }

}
