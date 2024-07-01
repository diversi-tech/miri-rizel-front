import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '@app/services/lead.service';

@Component({
  selector: 'app-delete-lead',
  templateUrl: './delete-lead.component.html',
  styleUrls: ['./delete-lead.component.css']
})
export class DeleteLeadComponent implements OnInit {

  greeting: Number = 0;
  constructor(private leadService: LeadService,private router: Router, private active: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.active.queryParams.subscribe(params => {
      this.greeting = params['greeting'];
    this.leadService.deleteLead( this.greeting ).subscribe(() => {
        
    });
    this.router.navigate(['../']);
  })
  }
}
