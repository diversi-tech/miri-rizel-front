import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
// תוסיף את זה לפני הקומפוננטה
newCustomer!: Customer; // אתה יכול להשתמש כדי ש להשמין

  constructor(private formBuilder: FormBuilder, private customerService: CustomersService, private validatorsService: ValidatorsService) {}

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

  addCustomer() {
    this.newCustomerFlag = true;
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
    });
  }
 

  openEditCustomerPopup() {
    
    const formElement = document.getElementById('editCustomerForm');
    Swal.fire({
      title: 'עריכת לקוח',
      html: `<div id="popupContainer"></div>`,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container && formElement) {
          formElement.style.display = 'block';
          container.appendChild(formElement);
          this.customerService.GetCustomerById(this.customerForm.value.customerId).subscribe(res => {
            this.customerForm.setValue(res);
          });
        }
      },
      willClose: () => {
                this.customerForm.reset()
        if(formElement) 
          formElement.style.display = 'none'; // בצע את השינוי רק אם formElement אינו null
        
      }
      
    });
  }

  editCustomer(customer: Customer) {
    this.customerService.GetCustomerById(customer.customerId).subscribe(res1 => {
      this.customerForm.setValue(res1);
      this.openEditCustomerPopup();
    });
  }

  editCustomerSubmit(): void {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    
    this.customerForm.value.status = this.selectedStatus;
    
    this.customerService.EditCustomer(this.customerForm.value).subscribe(() => {
      this.loadCustomers();
      this.customerForm.reset();
      this.submitted = false;
      Swal.close();
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
}
