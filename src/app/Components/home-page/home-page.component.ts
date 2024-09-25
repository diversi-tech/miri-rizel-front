import { Task } from 'src/app/Model/Task';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Type, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ProjectService } from '@app/Services/project.service';
import { DateTime } from 'luxon';
import { Lead } from '@app/Model/Lead';
import { TaskService } from '@app/Services/task.service';
import { LeadService } from '@app/Services/lead.service';
import { AddLeadComponent } from '@app/Components/Lead-components/add-lead/add-lead.component';
import Swal from 'sweetalert2';
import { UserService } from '@app/Services/user.service';
import { Customer } from '@app/Model/Customer';
import { CustomersService } from '@app/Services/customers.service';
import { AddTaskComponent } from '@app/Components/add-task/add-task.component';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { Project } from '@app/Model/Project';
import { GenericBourdComponent } from '@app/Components/generic-bourd/generic-bourd.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/Services/auth.service';
import { AddCustomerComponent } from '../customers/add-customer/add-customer.component';
import { NewComponent } from '../new/new.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GenericBourdComponent, MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe, TranslateModule, NgApexchartsModule],
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private _userService: UserService, private authService: AuthService, private TaskService: TaskService, private _leadService: LeadService, private _customerService: CustomersService, private resolver: ComponentFactoryResolver,
    private ProjectService: ProjectService, private translate: TranslateService, private cdr: ChangeDetectorRef
  ) { }
  isAdmin: boolean = false;
  user: User | any
  users!: User[]
  leads!: Lead[]
  customers!: Customer[]
  statuses: StatusCodeProject[] = [];
  projects: Project[] = [];
  priorities: Project[] = [];
  tasks!: Task[]
  loading: boolean = true;

  componentType!: Type<any>;

  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;
  @ViewChild('fullScreenComponent') fullScreenComponent!: ElementRef;

  data: any;
  selectedProject: string = 'מעבר ל..';
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  activeCustomers: number = 0;
  inactiveCustomers: number = 0;
  totalLeads: number = 0;

  public chartOptions: any;
  public chartTaskDistribution: any;


  ngOnInit(): void {

    this.TaskService.getAll().subscribe(
      (data: any) => {
        this.tasks = data;
        this.cdr.markForCheck();
      },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    );
    this._leadService.getAllLeads().subscribe(
      (data: Lead[]) => {
        this.leads = data;
        this.cdr.markForCheck();
      },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    );
    this._userService.getAll().subscribe((data: User[]) => {
      this.users = data
      const token = localStorage.getItem("token")?.toString()!
      const idtoken = this.authService.getClaim(token, "id")
      this.user = this.users.find(u => u.userId == idtoken)
      if (!this.user)
        this.user.firstName = "משתמש"
      this.cdr.markForCheck();
    },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    )
    this._customerService.GetAllCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.calculateStats();
        this.initChart();
        this.cdr.markForCheck();
      },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    );

    this.ProjectService.getAll().subscribe(
      (p: Array<Project>) => {
        this.projects = p.slice(0, 7);
        this.cdr.markForCheck();
      },
      (error) => {
        this.loading = true;
      })
    this.TaskService.getAllStatus().subscribe(
      (data) => {
        this.statuses = data
        this.cdr.markForCheck();
      },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    );
    this.TaskService.getAllPriorities().subscribe(
      (data) => {
        this.priorities = data
        this.cdr.markForCheck();

      },
      (error: any) => {
        // this.translate.get(['Close', 'errorServer']).subscribe(translations => {
        //   Swal.fire({
        //     text: translations[ 'errorServer'],
        //     icon: "error",
        //     showCancelButton: false,
        //     showCloseButton: true,
        //     confirmButtonColor: "#d33",
        //     confirmButtonText: translations['Close']
        //   })
        // })
      }
    );
    this.loading = false;
    this.cdr.markForCheck();
  }

  calculateStats() {
    this.activeCustomers = this.customers.filter(customer => customer.status.description === 'Active').length;
    this.inactiveCustomers = this.customers.filter(customer => customer.status.description === 'Inactive').length;
    this.totalLeads = this.leads.length;
  }

  initChart() {
    this.chartTaskDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: 400,
        width: '100%',
        type: 'polarArea',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      labels: ['Leads', 'Active Customers', 'Inactive Customers'],
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 1,
            strokeColor: '#E0E0E0',
          },
          spokes: {
            connectorColors: '#E0E0E0',
          },
        },
      },
      series: [this.totalLeads, this.activeCustomers, this.inactiveCustomers],
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75,
          },
        },
      },
      stroke: {
        width: 2,
      },
      colors: ['#49c1ba', '#A0A0A0', '#7F7F7F'],
      tooltip: {
        followCursor: true,
        theme: 'dark',
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9E9E9E',
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#E0E0E0',
        strokeDashArray: 0,
        position: 'back',
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
    };
  }


  openFullScreen(): void {
    const elem = this.fullScreenComponent.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  onToggleChange(event: any) {
    if (event.value === 'show-all') {
      this.router.navigate(['/project']);
    }
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  routing(list: any): void {
    this.filterData(list);
  }

  filterData(objToFilter: any): void {
    let taskFilter: Task[] = objToFilter;
    if (taskFilter.length != 0) {
      let loading: boolean = true;
      let col$types = { 'title': 'text', 'description': 'text', 'dueDate': 'date', 'createdDate': 'date' };
      let positionD = [this.statuses];
      let objData = [this.projects];
      let objFields = ['name'];
      if (this.genericBourd) {
        this.genericBourd.PopTable(taskFilter, loading, col$types, objData, objFields, positionD, "1000px");
      } else {
        this.translate.get(['Close', 'genericBourd is not initialized']).subscribe(translations => {
          Swal.fire({
            text: translations['genericBourd is not initialized'],
            icon: "error",
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: translations['Close']
          })
        })
      }
    } else {
      Swal.fire({
        text: 'no tasks',
        showCancelButton: false,
        showCloseButton: true,
        confirmButtonColor: "#49c1ba",
        confirmButtonText: 'Close'
      });
    }
  }
  addLead() {
    debugger
    console.log("addLead");
    this.componentType = AddLeadComponent;
    this.popUpAddOrEdit("Add Lead");
  }
  addCustomer() {
    this.componentType = AddCustomerComponent;
    this.popUpAddOrEdit("AddCustomerTitle");
  }
  addTask() {
    debugger
    this.componentType = AddTaskComponent;
    this.popUpAddOrEdit("Add Task");
  }
  addDocumentation() {
    this.componentType = NewComponent;
    this.popUpAddOrEdit("");
  }


  popUpAddOrEdit(title: string) {
    debugger
    Swal.fire({
      html: '<div id="popupContainer"></div>',
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(this.componentType);

          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.dataRefreshed.subscribe(() => {
          })
          container.appendChild(componentRef.location.nativeElement);
        }
      },
    });
  }

  getAllTask(): Task[] {
    return this.tasks
  }
  getTodoTasks(): Task[] {
    if (this.tasks)
      return this.tasks.filter(task => task.status?.description === "TO DO");
    return []
  }
  getTodoTasksByUser(): Task[] {
    if (this.tasks)
      return this.tasks.filter(task => task.status?.description === "TO DO" && task.assignedTo?.email == this.user.email);
    return []
  }

  getTodoTasksFromToday(): Task[] {
    const today = new Date().toDateString();
    return this.getTodoTasks().filter(task => {
      if (task.createdDate) {
        return new Date(task.createdDate).toDateString() === today;
      }
      return false;
    })
  }

  getInProgressTasks(): Task[] {
    if (this.tasks)
      return this.tasks.filter(task => task.status?.description === "IN PROGRESS");
    return []
  }
  getInProgressTasksByUser(): Task[] {
    if (this.tasks)
      return this.tasks.filter(task => task.status?.description === "IN PROGRESS" && task.assignedTo?.email == this.user.email);
    return []
  }
  getInProgressTasksFromToday(): Task[] {
    const today = new Date().toDateString();
    return this.getInProgressTasks().filter(task => {
      if (task.createdDate) {
        return new Date(task.createdDate).toDateString() === today;
      }
      return false;
    })
  }

  getTasksDueToday(): Task[] {
    const today = new Date().toDateString();
    if (this.tasks) {
      return this.tasks.filter(task => {
        if (task.dueDate) {
          return new Date(task.dueDate).toDateString() === today;
        }
        return false;
      })
    }
    return []
  }
  getTasksDueTodayAndClosed(): Task[] {
    const today = new Date().toDateString();
    if (this.tasks)
      return this.tasks.filter(task => {
        if (task.dueDate) {
          return new Date(task.dueDate).toDateString() === today && task.status?.description == "COMPLETE";
        }
        return false;
      })
    return []
  }
  getTasksOverdue(): Task[] {
    const now = new Date();
    if (this.tasks)
      return this.tasks.filter(task => {
        if (task.dueDate) {
          const dueDate = new Date(task.dueDate);
          return dueDate < now && task.status?.description !== "COMPLETE";
        }
        return false;
      });
    return []
  }
  getTasksOverdueFromYesterday(): Task[] {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateString = yesterday.toDateString();
    if (this.tasks)
      return this.tasks.filter(task => {
        if (task.dueDate) {
          return new Date(task.dueDate).toDateString() === yesterdayDateString;
        }
        return false;
      });
    return []
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _fixSvgFill(element: Element): void {
    const currentURL = this.router.url;
    Array.from(element.querySelectorAll('*[fill]'))
      .filter(el => {
        const fillAttr = el.getAttribute('fill');
        return fillAttr && fillAttr.indexOf('url(') !== -1;
      })

  }


  private _prepareChartData(): void {

  }
}