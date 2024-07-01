import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  statusCodeUser: StatusCodeUser[] = []
  customers: Customer[] = [];
  newCustomerFlag: boolean = false;
  editCustomerFlag: boolean = false;
  editCustomerId: number = -1;
  submitted = false
  submitted1 = false
  date: Date = new Date();
  customerForm!: FormGroup;
  editcustomer!: Customer;
  newCustomer!: Customer;
  s!: StatusCodeUser;
  selectedStatus!: StatusCodeUser;

  status: any;
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
    this.selectedStatus = this.statusCodeUser[0];
  }

  constructor(private formBuilder: FormBuilder, private customerService: CustomersService, private validatorsService: ValidatorsService) {
    this.customerService.GetAllCustomers().subscribe(res => this.customers = res);
    this.customerService.GetAllStatusUser().subscribe(res => {
      this.statusCodeUser = res,
      console.log(this.statusCodeUser);

    })

  }
  get formControls() { return this.customerForm.controls; }


  addCustomer() {
    this.newCustomerFlag = true;
  }

  addCustomerSubmit() {

    this.submitted1 = true;
    this.newCustomer = this.customerForm.value;
    this.selectedStatus = this.statusCodeUser.find(s => s.id == this.status) as StatusCodeUser;
    this.newCustomer.status = this.selectedStatus;
    console.log(this.customerForm);
    
    if (this.customerForm.invalid)
      return;

    this.customerService.AddNewCustomer(this.newCustomer).subscribe(() => {
      this.customerService.GetAllCustomers().subscribe(res => this.customers = res);
      this.submitted1 = false; this.newCustomerFlag = false;
      this.customerForm.reset();
    });
  }

  editCustomer(customerId: number, index: number) {
    this.editCustomerFlag = true;
    this.editCustomerId = index;
    this.customerService.GetCustomerById(customerId).subscribe(res1 => {
      this.editcustomer = res1;
      this.customerForm.setValue(res1)
      this.customerService.GetAllCustomers().subscribe(res => this.customers = res);
    });
  }

  editCustomerSubmit(id: number): void {

    this.submitted = true;
    this.editcustomer = this.customerForm.value;
    this.editcustomer.status = this.selectedStatus;
    if (this.customerForm.invalid)
      return;
    this.editcustomer.customerId = id;
    this.selectedStatus = this.statusCodeUser.find(s => s.id == this.status) as StatusCodeUser;
    this.customerService.EditCustomer(this.editcustomer).subscribe(() => {
      this.customerService.GetAllCustomers().subscribe(res => this.customers = res);
      this.submitted = false;
      this.editCustomerId = -1;
      this.editCustomerFlag = false;
      this.customerForm.reset();
    });
  }

  deleteCustomer(customerId: number) {
    this.customerService.DeleteCustomer(customerId).subscribe(() => {
      this.customerService.GetAllCustomers().subscribe(res => this.customers = res);
    });
  }

  selectItem(event: any) {
    this.status = event.target.value;
    console.log(`status: ${this.status}`);

  }



}
