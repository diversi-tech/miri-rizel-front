import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-leads',
  templateUrl: './list-leads.component.html',
  styleUrls: ['./list-leads.component.css']
})
export class ListLeadsComponent {

  constructor(private router: Router){}

  addLead(){
    this.router.navigate(['addLead']);
  }
}
