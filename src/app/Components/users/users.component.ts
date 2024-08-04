import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { User } from '@app/Model/User';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
import { UserService } from '@app/Services/user.service';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RoleCodeUser } from '@app/Model/RoleCodeUser';
import { TranslateService } from '@ngx-translate/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';
import { AuthService } from '@app/Services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [GenericBourdComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  componentType!: Type<any>;
  roles: RoleCodeUser[] = [];
  isAdmin: boolean= false;

  // @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;

  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
    this.userService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
        
        this.loading = false;
      },
     
      (error: any) => {
        this.loading = false;
        this.translate.get(['Close', 'errorServer']).subscribe(translations => {
          Swal.fire({
            text: translations[ 'errorServer'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      }
    );
    const role= this.authService.getRole();
      if(role===3){
        this.isAdmin=true;
      }
  }
  constructor(
    private userService: UserService,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private appRef: ApplicationRef,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  editUser(user: User) {
    this.componentType = EditUserComponent;
    console.log(`user: ${user} userId: ${user.userId}`);
    this.popUpAddOrEdit(user.userId);
  }
  addUser() {
    // this.componentType = SignUpComponent;
    // this.popUpAddOrEdit();
    this.router.navigate(['/sign-up']);
  } 
  deleteUser(user: User) {
    this.translate
    .get(['userDeleted', 'userUndeleted', 'userUndefind', 'userUnFound'])
    .subscribe((translations) => {
      this.userService.deleteUserById(user.userId!).subscribe(
        (deleted) => {
          deleted
            ? Swal.fire({ title: translations['userDeleted'], icon: 'success' })
            : Swal.fire({
                title: translations['userUndeleted'],
                icon: 'error',
              });
        },
        (error) =>
          error.status == 404
            ? Swal.fire({ title: translations['userUnFound'], icon: 'error' })
            : Swal.fire({ title: translations['userUndeleted'], icon: 'error' })
      );
    });
  }

  popUpAddOrEdit(l?: Number) {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          if (container == undefined) console.log(',l;,');
          const factory = this.resolver.resolveComponentFactory(
            this.componentType
          );
          const componentRef = this.popupContainer.createComponent(factory);
          if (l != null && l != undefined) componentRef.instance.userId = l;
          // componentRef.instance.setData(l);
          componentRef.instance.dataRefreshed.subscribe(() => {
            this.refreshData();})
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  refreshData() {
    this.userService.getAll().subscribe((users) => (this.users = users));
  }
}
