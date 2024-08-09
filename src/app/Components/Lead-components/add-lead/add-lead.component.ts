import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Lead } from 'src/app/Model/Lead';
import { LeadService } from 'src/app/Services/lead.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '@app/Services/language.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    InputTextModule,
    TranslateModule,
  ],
})
export class AddLeadComponent implements OnInit{
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();
  userForm: FormGroup;
  titlePage: string;
  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    'direction': 'rtl'     // ברירת מחדל עברית
  };
  constructor(
    private formBuilder: FormBuilder,
    private leadSrv: LeadService,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService

  ) {
    // בניית הטופס בעזרת FormBuilder
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          this.phoneValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      source: ['', [Validators.required]],
      createdDate: [new Date()],
      lastContactedDate: [new Date()],
      businessName: ['', [Validators.required]],
      notes: [''],
    });
    this.titlePage = 'AddLead';
  }
  ngOnInit() {
    // האזנה לשינויים בשפה
    this.languageService.language$.subscribe(lang => {
      if (lang === 'he') {
        this.styles['text-align'] = 'right';
        this.styles['direction'] = 'rtl';
      } else {
        this.styles['text-align'] = 'left';
        this.styles['direction'] = 'ltr';
      }
    });
  }
  submitForm = () => {
    let formData = this.userForm.value;
    this.leadSrv.existsEmail(this.userForm.value.email).subscribe(res => {
      if (res == true) {
      this.translate.get(['EmailFound','error','OK']).subscribe(translation=>{
        Swal.fire({
          title: translation['error'],
          text: translation['EmailFound'],
          icon: 'error',
          confirmButtonText: translation['OK']
        });
      })
      
       
        return;
      } else {
    this.leadSrv.addLead(formData).subscribe((lead) => {
      //alert('הליד נוסף בהצלחה' + lead);
      this.translate.get('addLeadSuccess').subscribe((translation) =>
        Swal.fire({ title: translation, icon: 'success' }).then(() => {
          this.userForm.reset();
          Object.keys(this.userForm.controls).forEach((key) => {
            this.userForm.controls[key].markAsUntouched();
          });
          this.dataRefreshed.emit();
          Swal.close();
        })
      );
    });
  };
})}

  backListLeadsPage = () => {
    this.router.navigate(['leads']);
  };
  // Validator מותאם אישית לטלפון
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex =
      /^(\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{7}|\d{2}-\d{3}-\d{4}|\d{2}-\d{6,7})$/; // ביטוי רגולרי שמאפשר רק מספרים ומקף
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
  }
}
