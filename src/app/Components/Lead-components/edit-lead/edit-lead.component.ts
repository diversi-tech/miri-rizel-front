import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '@app/services/lead.service';
import { Component, OnInit } from '@angular/core';
import { Lead } from '@app/Model/Lead';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.css']
})
export class EditLeadComponent {

  constructor(private formBuilder: FormBuilder, private lead: LeadService, private router: Router, private active: ActivatedRoute) {
    this.active.queryParams.subscribe(params => {
      this.greeting = params['greeting'];
      console.dir(this.greeting); 
      this.lead.GetLeadById(this.greeting).subscribe((lead2: Lead) => {
        this.LeadToKnowInput = lead2;
        this.editForm = this.formBuilder.group({
          email: [this.LeadToKnowInput.email, [Validators.required, Validators.email]],
          firstName: [this.LeadToKnowInput.firstName, [Validators.required]],
          lastName: [this.LeadToKnowInput.lastName, [Validators.required]],
          phone: [this.LeadToKnowInput.phone, [Validators.required]],
          source: [this.LeadToKnowInput.source, [Validators.required]],
          lastContactedDate: [this.LeadToKnowInput.lastContactedDate, [Validators.required, this.futureDateValidator()]],
          businessName: [this.LeadToKnowInput.businessName, [Validators.required]],
          notes: [this.LeadToKnowInput.notes, [Validators.required]],
        });
      });
    });
    this.active.queryParams.subscribe(params => {
      const greeting = params['greeting'];
  });
  }

  greeting: Number = 0;
  editForm!: FormGroup;
  submitted = false;
  showInput: boolean = false;
  allLeads: Lead[] = [];
  LeadToKnowInput: Lead = { leadId: 1, firstName: '', lastName: '', phone: '', email: '', source: '', createdDate: new Date(), lastContactedDate: new Date(), businessName: '', notes: '' };

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate > today ? null : { notFutureDate: true };
    };
  }

  ngOnInit(): void {
    this.loadAllLeads();
  }

  loadAllLeads(): void {
    this.lead.getAllLeads().subscribe((l: any) => {
      l.forEach((c: any) => {
        this.allLeads.push(c);
      });
    });
  }

  get formControls() { return this.editForm.controls; }

  toEnter() {
    console.log(this.greeting);
    this.submitted = true;
    if (this.editForm.invalid) { return; }
    this.lead.editLead(this.editForm.value, this.greeting).subscribe(updatedLead => {
      console.log('Lead successfully updated:', updatedLead);
    }, error => {
      console.error('Error editing lead:', error);
    });
    this.router.navigate(['../']);
  }

}









