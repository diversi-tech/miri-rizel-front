import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor( private resolver: ComponentFactoryResolver) { }

  
  popUpAddOrEdit(component: Type<any>,popupContainer: ViewContainerRef,dataRefreshed: () => void, userId?: Number ) {
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          if (container == undefined) console.log(',l;,');
          const factory = this.resolver.resolveComponentFactory(
            component
          );
          const componentRef = popupContainer.createComponent(factory);
          if (userId != null && userId != undefined){componentRef.instance.userId = userId; console.log("uesrId");
          } 
          // componentRef.instance.setData(l);
          if(dataRefreshed!=null && dataRefreshed!= undefined){
            componentRef.instance.dataRefreshed.subscribe(() => {
              dataRefreshed();
            });
          }
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }
  
}
