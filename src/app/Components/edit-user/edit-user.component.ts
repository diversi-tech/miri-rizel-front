import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { User } from 'src/app/Model/User';
import { EditUserService } from '../../Services/edit-user.service';
import { NgIf } from '@angular/common';
import { UserService } from '@app/Services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { RoleCodeUser } from '@app/Model/RoleCodeUser';
import { DropdownModule } from 'primeng/dropdown';
import Swal from 'sweetalert2';
import { LanguageService } from '@app/Services/language.service';
import { AuthService } from '@app/Services/auth.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, AutoCompleteModule,TranslateModule, 
      InputTextModule,
      DropdownModule    ]
})
export class EditUserComponent implements OnInit {
  @Input()
  userId: Number=0;
  @Output()
  dataRefreshed: EventEmitter<any>= new EventEmitter<void>();
  user!: User;
  flag: Boolean = false;
  isAdmin: boolean= false;
  roles:RoleCodeUser[]=[]
  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    'direction': 'rtl'     // ברירת מחדל עברית
  };
 

  constructor(private userService: UserService, private translate: TranslateService, 
    private languageService: LanguageService, private authService:AuthService ) {
  }
  ngOnInit() {
    
    this.userService.getUserById(this.userId).subscribe(user=>{ 
      this.user=user;
      
      // const myUser=JSON.parse(localStorage.getItem('user')!) as User;
      // const token= localStorage.getItem("token");
      // if(token){
      //   const decryptRole=this.userService.decryptRole(token);
      //   if(decryptRole=="Admin"){
      //     this.isAdmin=true;
      //   }
      // }
      const role= this.authService.getRole();
      if(role===3){
        console.log("I am admin");
        this.isAdmin=true;
      }
       
      this.userService.getAllRoles().subscribe(roles=>  {
        this.roles = roles;
        this.flag = true
      });
    });
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
  submit() {
    this.translate.get(['userNotSaved', 'userSaved', ]).subscribe(translations => {
    this.userService.updateUser(this.user).subscribe(flag=> {if(flag) Swal.fire({title:translations['userSaved'], icon: 'success'})}
    , (error)=>{Swal.fire({title: translations['userNotSaved'],
      icon: 'error'
    })
    })
    this.flag = false
    this.dataRefreshed.emit();
    Swal.close();
  })
  }

  onRoleSelected(event: any) {
    const selectedRole = event.value; // הערך הנבחר
    this.user.role = selectedRole; // עדכון התפקיד של המשתמש
    console.log('Selected Role:', selectedRole); 
  }
  
  filterProjectAuto(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.roles.length; i++) {
      let role = this.roles[i];
      if (role.description.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(role);
      }
    }
    this.roles = filtered;
  }
}

