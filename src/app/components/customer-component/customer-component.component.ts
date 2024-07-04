import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/Model/Project';
import { Country, Customer, Representative } from 'src/app/Model/Customer';
import { User } from 'src/app/Model/User';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/user.service';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent {
  
    //constructor(private router: Router){}
    Customers: Customer[] = [];
    country: Country[] = [];
    representative: Representative[] = [];
    loading: boolean = true;
    @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  
    constructor(private customerService: CustomerService,  private router: Router) { }
  
    ngOnInit() {
      // this.customerService.getAllLeads().subscribe(
      //   (Leads: Array<Lead>) => {
      //     this.Leads = Leads;
      //     this.loading = false;
          // // this.loading = false;
          // console.log(this.Leads);
          // this.userService.getAll().subscribe(
          //   (users: Array<User>) => {
          //     this.users = users;
          //     this.loading = false;
          //     console.log(this.users);
          //   },
        }
        //   (error) => {
        //         console.error('Error fetching users:', error);
        //         this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
        //       }
        //     );
        //   },
        //   (error) => {
        //     console.error('Error fetching Leads:', error);
        //     this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
        //   }
        // );
      // )
    
    onEditCustomer(c:Customer) {
      // this.leadService.editLead(lead).subscribe(() => {
      //   (Leads: Array<Lead>) => {
      //     this.Leads = Leads;
      //     this.loading= false;
      // }});
      // this.router.navigate(['editLead']);
    }
  
    onDeleteCustomer(c: Customer) {
     
    }
  
    addCustomer() {
     
    }
  }
  

