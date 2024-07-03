import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { Lead } from 'src/app/Model/Lead';
import { User } from 'src/app/Model/User';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { GenericBourdComponent } from '../../generic-bourd/generic-bourd.component';
import { LeadService } from 'src/app/Services/lead.service';
import Swal from 'sweetalert2';
import { AddLeadComponent } from '../add-lead/add-lead.component';
import { EditUserComponent } from '@app/Components/edit-user/edit-user.component';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.css']
})
export class ListLeadsComponent {

 //constructor(private router: Router){}
  Leads: Lead[] = [];
  users: User[] = [];
  projects: Project[] = [];
  loading: boolean = true;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  constructor(private leadService: LeadService, private userService: UserService, private router: Router, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.refreshData();
  }

  onEditLead(Lead: Lead) {
    // Handle edit logic here
    console.log('Edit Lead:', Lead);
  }

  onDeleteLead(Lead: Lead) {
    // Handle delete logic here
    console.log('Delete Lead:', Lead);
  }

  filterData(objToFilter: any) {
    let userFilter: User[] = this.users.filter(u => u.lastName == objToFilter.assignedTo.lastName)
    let loading:boolean = true
    let col$types = { 'lastName': 'text', 'firstName': 'text' }
    let positionD:[] = []
    let objData = [this.users, this.projects]
    let objFields = ['email','name']
    this.genericBourd.PopTable(userFilter, loading, col$types,objData,objFields,positionD);
  }
  componentType!: Type<any>;
   addLead(){
    this.componentType = AddLeadComponent;
    this.popUpAddOrEdit("Add Lead");
    }

     refreshData() {
      this.leadService.getAllLeads().subscribe(
        (Leads: Array<Lead>) => {
          this.Leads = Leads;
          this.loading= false;
          console.log("refreshData: ", this.Leads);
        })
    }
  

    popUpAddOrEdit(title: string){
      Swal.fire({
        title: title,
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
  }

