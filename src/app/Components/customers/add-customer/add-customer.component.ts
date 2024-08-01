import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '@app/Model/Customer';
import { StatusCodeUser } from '@app/Model/StatusCodeUser';
import { CustomersService } from '@app/Services/customers.service';
import { ValidatorsService } from '@app/Services/validators.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [TranslateModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    NgIf, 
    NgFor,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit {
  submitted1: boolean = false;
  customerForm!: FormGroup;
  selectedStatus!: StatusCodeUser;
  newCustomer!: Customer;
  titlePage!: string;
  statusCodeUser: StatusCodeUser[] = [];


  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    'direction': 'rtl'     // ברירת מחדל עברית
  };
  constructor(private router: Router, private formBuilder: FormBuilder,private translate:TranslateService, private customerService: CustomersService, private validatorsService: ValidatorsService) {

  }
  @Output() dataRefreshed: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerId: [0],
      firstName: ['', [Validators.required, this.customNameValidator()]],
      lastName: ['', [Validators.required, this.customNameValidator()]],
      phone: ['', [Validators.required, this.customPhoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      businessName: ['', [Validators.required]],
      source: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createdDate: ['', [Validators.required, this.futureDateValidator()]],
    });
    this.loadStatusUsers();
    this.titlePage="AddCustomerTitle"
  }
  get formControls() { return this.customerForm.controls; }
  private loadStatusUsers(): void {
    this.customerService.GetAllStatusUser().subscribe(res => {
      this.statusCodeUser = res;
      console.log(res);
      if (this.statusCodeUser.length > 0) {
        this.selectedStatus = this.statusCodeUser[0];
      }
    });
  }
  addCustomerSubmit() {

    this.submitted1 = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.newCustomer = this.customerForm.value;
    this.selectedStatus = this.customerForm.value.status as StatusCodeUser
    this.newCustomer.status = this.selectedStatus;
    this.newCustomer.customerId = 0;
    this.customerService.AddNewCustomer(this.newCustomer).subscribe(() => {
      this.translate.get('addCustomerSuccess').subscribe((translation) =>
        Swal.fire({ title: translation, icon: 'success' }).then(() => {
          this.customerForm.reset();
          Object.keys(this.customerForm.controls).forEach((key) => {
            this.customerForm.controls[key].markAsUntouched();
          });
      this.submitted1 = false;
      this.dataRefreshed.emit();
      Swal.close();
    }))
  });
  
  }

  customNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.validatorsService.name(control.value) ? null : { invalidName: true };
    };
  }

  customPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.validatorsService.phone(control.value) ? null : { invalidPhone: true };
    };
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate > today ? null : { notFutureDate: true };
    };
  }

}
