import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StatusCodeUser } from '@app/Model/StatusCodeUser';
import { Customer } from 'src/app/Model/Customer';
import { CustomersService } from 'src/app/Services/customers.service';
import { ValidatorsService } from 'src/app/Services/validators.service';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { Lead } from '@app/Model/Lead';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [ CommonModule,GenericBourdComponent,FormsModule, DropdownModule, CalendarModule, ReactiveFormsModule, InputTextModule, NgIf, NgFor, 
    
  ]
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
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  nameForm!: string;

  constructor(private resolver: ComponentFactoryResolver, private router: Router, private formBuilder: FormBuilder, private customerService: CustomersService, private validatorsService: ValidatorsService) { }

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
    this.nameForm=title
    if (formElement) {
      this.originalParent = formElement.parentElement;
      Swal.fire({
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
    this.openEditCustomerPopup("הוספת לקוח", "addCustomer");
  }

  addCustomerSubmit() {
    this.submitted1 = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.newCustomer = this.customerForm.value;
    this.newCustomer.status = this.selectedStatus;
    console.log(this.newCustomer);
    this.newCustomer.customerId = 0;
    this.newCustomer.customerId = 0;
    this.customerService.AddNewCustomer(this.newCustomer).subscribe(() => {
      this.loadCustomers();
      this.customerForm.reset();
      this.submitted1 = false;


      Swal.close();
    });
  }

  editCustomer(customer: Customer) {
    this.customerService.GetCustomerById(customer.customerId).subscribe((res1: any) => {
      if (res1.createdDate)
        res1.createdDate = new Date(res1.createdDate);
      const status = res1.status as StatusCodeUser
      res1.status = status
      this.customerForm.setValue(res1);
      this.openEditCustomerPopup("עריכת משתמש", "editCustomer");
    });
  }

  editCustomerSubmit(): void {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.customerForm.value.status = this.selectedStatus;
    this.customerService.EditCustomer(this.customerForm.value).subscribe(() => {
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

  customNameValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.name(control.value) ? null : { invalidName: true };
    };
  }

  customPhoneValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.phone(control.value) ? null : { invalidPhone: true };
    };
  }

  customFutureDateValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.validatorsService.futureDate()(control.value) ? null : { invalidDate: true };
    };
  }

  propil(customer: Customer) {
    this.componentType = ChatComponent;
    this.popUpAddOrEdit(`Communication ${customer.firstName}`, customer, "customer", customer.customerId);
  }
  popupOpen = false;
  componentType!: Type<any>;

  popUpAddOrEdit(title: string, l: Customer, s: String, id: Number) {
    // this.flag = false;
    this.popupOpen = true; // Set popupOpen to true when the pop-up is opened
    Swal.fire({
      title: title,
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          if (l != null && l != undefined)
            componentRef.instance.setData(l, s, id);
          container.appendChild(componentRef.location.nativeElement);
        }
      },
      didClose: () => {
        this.popupOpen = false; // Set popupOpen to false when the pop-up is closed
      }
    });
    this.logNumbersWhilePopupOpen();
  }

  logNumbersWhilePopupOpen() {
    let counter = 0;
    const interval = setInterval(() => {
      if (this.popupOpen) {
        counter++;
      } else {
        clearInterval(interval); // Stop logging numbers when the pop-up is closed
        // this.custService.GetCustomerById(this.cus.customerId).subscribe(res=>{this.cus=res,this.flag=true})
      }
    }, 1000); // Log every second
  }

}
