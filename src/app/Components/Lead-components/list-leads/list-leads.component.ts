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
    this.leadService.getAllLeads().subscribe(
      (Leads: Array<Lead>) => {
        this.Leads = Leads;
        this.loading = false;
      }
    )
  }
  onEditLead(Lead: Lead) {
    this.router.navigate(['editLead'], { queryParams: { greeting: Lead.leadId } });
  }

  onDeleteLead(lead: Lead) {
    // this.leadService.deleteLead(lead.leadId).subscribe(() => {
    //   this.Leads = this.Leads.filter((l) => l.leadId !== lead.leadId);
    // });
    this.router.navigate(['deleteLead'], { queryParams: { greeting: lead.leadId } });
  }

  addLead() {
    this.router.navigate(['addLead']);
  }
}
