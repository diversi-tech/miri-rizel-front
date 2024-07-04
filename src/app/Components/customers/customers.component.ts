import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StatusCodeUser } from '@app/Model/StatusCodeUser';
import { Customer } from 'src/app/Model/Customers';
import { CustomersService } from 'src/app/Services/customers.service';
import { ValidatorsService } from 'src/app/Services/validators.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  editCustomerFlag: boolean = false;
  loading: boolean = true;
  statusCodeUser: StatusCodeUser[] = [];
  customers: Customer[] = [];
  newCustomerFlag: boolean = false;
  editCustomerId: number = -1;
  submitted: boolean = false;
  submitted1: boolean = false;
  date: Date = new Date();
  customerForm!: FormGroup;
  selectedStatus!: StatusCodeUser;
  status: any;
  private originalParent: HTMLElement | null = null;
  newCustomer!: Customer;

  constructor(private formBuilder: FormBuilder, private customerService: CustomersService, private validatorsService: ValidatorsService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerId: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      businessName: ['', [Validators.required]],
      source: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
    });

    this.loadCustomers();
    this.loadStatusUsers();
  }

  private loadCustomers(): void {
    this.customerService.GetAllCustomers().subscribe(res => {
      this.customers = res;
      this.loading = false;
    });
  }

  private loadStatusUsers(): void {
    this.customerService.GetAllStatusUser().subscribe(res => {
      this.statusCodeUser = res;
      if (this.statusCodeUser.length > 0) {
        this.selectedStatus = this.statusCodeUser[0];
      }
    });
  }

  get formControls() { return this.customerForm.controls; }
  openEditCustomerPopup(title: string, formId: string) {
    const formElement = document.getElementById(formId);
    if (formElement) {
      this.originalParent = formElement.parentElement;
      Swal.fire({
        title: title,
        html: `<div id="popupContainer"></div>`,
        showConfirmButton: false,
        didOpen: () => {
          const container = document.getElementById('popupContainer');
          if (container) {
            container.appendChild(formElement);
            formElement.style.display = 'block';
          }
        },
        willClose: () => {
          this.customerForm.reset();
          if (formElement && this.originalParent) {
            formElement.style.display = 'none';
            this.originalParent.appendChild(formElement);
          }
        }
      });
    }
  }
  addCustomer() {
    console.log("sd");
    this.openEditCustomerPopup("הוספת לקוח", "addCustomer");
  }
  addCustomerSubmit() {
    this.submitted1 = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.newCustomer = this.customerForm.value;
    this.newCustomer.status = this.selectedStatus;
    this.customerService.AddNewCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.submitted1 = false;
      this.newCustomerFlag = false;
      this.customerForm.reset();
      console.log("dlas;");
      
      Swal.close();
    });
  }
  editCustomer(customer: Customer) {
    this.customerService.GetCustomerById(customer.customerId).subscribe(res1 => {
      this.customerForm.setValue(res1);
      console.log("ssss");
      this.openEditCustomerPopup("עריכת משתמש", "editCustomer");
    });
  }
  editCustomerSubmit(): void {
    console.log("f,l,l");
    
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.customerForm.value.status = this.selectedStatus;
    console.log("f,l,ltttgggg");

    this.customerService.EditCustomer(this.customerForm.value).subscribe(() => {
      console.log("f,l,lgggg");
      Swal.close();
      this.loadCustomers();
      this.customerForm.reset();
      this.submitted = false;
     
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerService.DeleteCustomer(customer.customerId).subscribe(() => {
      this.loadCustomers();
    });
  }
  selectItem(event: any) {
    this.status = event.target.value;
    this.selectedStatus = this.statusCodeUser.find(s => s.id == this.status) as StatusCodeUser;
  }

  customNameValidator(): (control: FormControl ) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.name(control.value) ? null : { invalidName: true};
    };
  }
  customPhoneValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.phone(control.value) ? null : { invalidPhone:true };
    };
  }

  customFutureDateValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.futureDate()(control.value) ? null : { invalidDate: true };
    };
  }

}
