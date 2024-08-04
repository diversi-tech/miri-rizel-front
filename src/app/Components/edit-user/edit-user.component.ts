import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { User } from 'src/app/Model/User';
import { NgIf } from '@angular/common';
import { UserService } from '@app/Services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { RoleCodeUser } from '@app/Model/RoleCodeUser';
import { DropdownModule } from 'primeng/dropdown';
import Swal from 'sweetalert2';
import { LanguageService } from '@app/Services/language.service';
import { AuthService } from '@app/Services/auth.service';
import { GenericBourdComponent } from '@app/Components/generic-bourd/generic-bourd.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    AutoCompleteModule,
    TranslateModule,
    InputTextModule,
    DropdownModule,
  ],
})
export class EditUserComponent implements OnInit {
  @Input()
  userId: Number = 0;
  @Output()
  dataRefreshed: EventEmitter<any> = new EventEmitter<void>();
  user!: User;
  flag: Boolean = false;
  isAdmin: boolean = false;
  roles: RoleCodeUser[] = [];
  styles = {
    'text-align': 'right', // ברירת מחדל עברית
    direction: 'rtl', // ברירת מחדל עברית
  };
  desc: string = '';
  // @ViewChild(GenericBourdComponent) genericBourd: GenericBourdComponent;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    if(this.userId!=0){
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.user = user;
        // this.desc= user.role? user.role.description: '';
        const role = this.authService.getRole();
        if (role === 3) this.isAdmin = true;
        this.getAllRolesAndTranslate();
        this.flag = true;
      });
    }
    
    this.languageService.language$.subscribe((lang) => {
      if (lang === 'he') {
        this.styles['text-align'] = 'right';
        this.styles['direction'] = 'rtl';
      } else {
        this.styles['text-align'] = 'left';
        this.styles['direction'] = 'ltr';
      }
      this.getAllRolesAndTranslate();
    });
  }

  getAllRolesAndTranslate() {
    this.userService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
      this.translate
      .get(this.roles.map((role: RoleCodeUser) => role.description))
      .subscribe((rolestrans) => {
        this.roles = this.roles.map((role1) => {
          role1.description = rolestrans[role1.description];
          return role1;
        });
        this.desc = this.user.role
          ? rolestrans[this.user.role?.description]
          : '';
      });
    });
  }

  submit() {
    this.translate
    .get(['userNotSaved', 'userSaved'])
    .subscribe((translations) => {
      this.userService.updateUser(this.user).subscribe(
        (flag) => {
          if (flag) {
            Swal.fire({ title: translations['userSaved'], icon: 'success' });
            this.dataRefreshed.emit();
          }
        },
        (error) => {
          Swal.fire({ title: translations['userNotSaved'], icon: 'error' });
        }
      );
      this.flag = false;
      Swal.close();
    });
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
    console.log('filtered: ' + filtered);
    this.roles = filtered;
  }

  // disableDelete() {
  //   if()
  //   if (this.genericBourd) {
  //     this.genericBourd.disableButton = true; // או False, בהתאם לצורך שלך
  //   }
  // }
}
