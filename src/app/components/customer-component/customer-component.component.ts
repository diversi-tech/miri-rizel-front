import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country, Customer, Representative } from 'src/app/Model/Customer';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';

@Component({
    selector: 'app-customer-component',
    templateUrl: './customer-component.component.html',
    standalone: true,
    imports: [GenericBourdComponent],
})
export class CustomerComponentComponent {
  
    //constructor(private router: Router){}
    Customers: Customer[] = [];
    country: Country[] = [];
    representative: Representative[] = [];
    loading: boolean = true;
    @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  
    constructor( private router: Router) { }
  
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
  

