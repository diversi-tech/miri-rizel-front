import { ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { User } from '@app/Model/User';
import { GenericBourdComponent } from "../generic-bourd/generic-bourd.component";
import { UserService } from '@app/Services/user.service';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RoleCodeUser } from '@app/Model/RoleCodeUser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [GenericBourdComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: User[]=[];
  loading: boolean= true;
  componentType!: Type<any>;
  roles:RoleCodeUser[]=[]

  // @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;


  ngOnInit(): void {
    this.userService.getAll().subscribe(users=> {
      console.log("users: "+users);
      this.users= users;
    
    })
    this.userService.getAllRoles().subscribe(roles=>  {
      this.roles = roles;
      // roles.map(role=> role as RoleCodeUser);
      console.log("roles: "+this.roles + this.roles[0].description);
      this.loading= false;
    },
    (error) => {
      console.error('Error fetching users:', error);
      this.loading = false; // לוודא שהטעינה מפסיקה גם במקרה של שגיאה
    }
  )
  }
  constructor(private userService: UserService, private resolver: ComponentFactoryResolver,    private viewContainerRef: ViewContainerRef, private injector: Injector,
    private appRef: ApplicationRef){}

  editUser(user: User){
    this.componentType= EditUserComponent;
    console.log(`user: ${user} userId: ${user.userId}`);
    this.popUpAddOrEdit(user.userId);
  }
  addUser(){
    this.componentType= EditUserComponent;
    this.popUpAddOrEdit();
  }//קישור לsignUp
  deleteUser(user: User){}

  popUpAddOrEdit(l?:Number) {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          if(container==undefined)
            console.log(",l;,");
          const factory = this.resolver.resolveComponentFactory(this.componentType);
          const componentRef = this.popupContainer.createComponent(factory);
          if(l!=null && l!=undefined) 
            componentRef.instance.userId= l;        
          // componentRef.instance.setData(l);
          // componentRef.instance.dataRefreshed.subscribe(() => {
          //   this.refreshData();})
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  refreshData(){
    this.userService.getAll().subscribe(users=> this.users= users);
  }
  
}
