import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '@app/Services/lead.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Lead } from '@app/Model/Lead';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LanguageService } from '@app/Services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from 'primeng/api';


@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.css'],
  standalone: true,
  imports: [InputTextModule, TranslateModule, NgIf, FormsModule, ReactiveFormsModule, MatButtonModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    SharedModule,
    TranslateModule,
  ]
})
export class EditLeadComponent implements OnInit {
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();
  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    'direction': 'rtl'     // ברירת מחדל עברית
  };
  constructor(private formBuilder: FormBuilder, private lead: LeadService, private router: Router, private active: ActivatedRoute, private languageService: LanguageService) { }
  ngOnInit(): void {
    this.languageService.language$.subscribe(lang => {
      if (lang === 'he') {
        this.styles['text-align'] = 'right';
        this.styles['direction'] = 'rtl';
      } else {
        this.styles['text-align'] = 'left';
        this.styles['direction'] = 'ltr';
      }
    })
  }
  fullForm() {
    this.editForm = this.formBuilder.group({
      email: [this.LeadToKnowInput.email, [Validators.required, Validators.email]],
      firstName: [this.LeadToKnowInput.firstName, [Validators.required]],
      lastName: [this.LeadToKnowInput.lastName, [Validators.required]],
      phone: [this.LeadToKnowInput.phone, [Validators.required]],
      source: [this.LeadToKnowInput.source, [Validators.required]],
      lastContactedDate: [this.extractDate(String(this.LeadToKnowInput.lastContactedDate)), [Validators.required]],
      businessName: [this.LeadToKnowInput.businessName, [Validators.required]],
      notes: [this.LeadToKnowInput.notes, []],
    });
    this.flag = true;
  }

  extractDate(dateTime: string): string {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  setData(data: any) {
    this.data = data;
    this.lead.GetLeadById(this.data).subscribe((lead2: Lead) => {
      this.LeadToKnowInput = lead2;
      this.fullForm();
    });
  }

  data: any;
  editForm!: FormGroup;
  submitted = false;
  flag = false;
  showInput: boolean = false;
  allLeads: Lead[] = [];
  LeadToKnowInput: Lead = { leadId: 1, firstName: '', lastName: '', phone: '', email: '', source: '', createdDate: new Date(), lastContactedDate: new Date(), businessName: '', notes: '' };

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today ? null : { notFutureDate: true };
    };
  }

  get formControls() { return this.editForm.controls; }

  async toEnter() {
    this.submitted = true;
    if (this.editForm.invalid) { return; }
    
    this.lead.editLead(this.editForm.value, this.data).subscribe()
    await this.delay(50);
    Object.keys(this.editForm.controls).forEach((key) => {
      this.editForm.controls[key].markAsUntouched();
    });
    this.dataRefreshed.emit();
    Swal.close();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}









