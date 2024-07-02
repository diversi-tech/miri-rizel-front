import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { Lead } from 'src/app/Model/Lead';
import { User } from 'src/app/Model/User';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { GenericBourdComponent } from '../../generic-bourd/generic-bourd.component';
import { LeadService } from '@app/services/lead.service';

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

  constructor(private leadService: LeadService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log("ExempleComponent");

    this.leadService.getAllLeads().subscribe(
      (Leads: Array<Lead>) => {
        this.Leads = Leads;
        this.loading= false;
        // // this.loading = false;
        // console.log(this.Leads);
        // this.userService.getAll().subscribe(
        //   (users: Array<User>) => {
        //     this.users = users;
        //     this.loading = false;
        //     console.log(this.users);
        //   },
      }
    //   (error) => {
    //         console.error('Error fetching users:', error);
    //         this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
    //       }
    //     );
    //   },
    //   (error) => {
    //     console.error('Error fetching Leads:', error);
    //     this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
    //   }
    // );
    )
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
  addLead(){
    this.router.navigate(['addLead']);
  }
}
