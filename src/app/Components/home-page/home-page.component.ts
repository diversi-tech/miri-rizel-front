import { Task } from 'src/app/Model/Task';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Type, ViewEncapsulation, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { ProjectService } from '../../Services/project.service';
import { DateTime } from 'luxon';
import { Lead } from '@app/Model/Lead';
import { TaskService } from '@app/Services/task.service';
import { LeadService } from '@app/Services/lead.service';
import { AddLeadComponent } from '../Lead-components/add-lead/add-lead.component';
import Swal from 'sweetalert2';
import { UserService } from '@app/Services/user.service';
import { Customer } from '@app/Model/Customer';
import { CustomersService } from '@app/Services/customers.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { StatusCodeProject } from '@app/Model/StatusCodeProject';
import { Project } from '@app/Model/Project';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:  [GenericBourdComponent,MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, NgFor, NgIf, MatTableModule, NgClass, CurrencyPipe],
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private _userService: UserService, private TaskService: TaskService, private _leadService: LeadService, private _customerService: CustomersService, private resolver: ComponentFactoryResolver, private ProjectService: ProjectService) { }
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

  currentEmail: string = localStorage.getItem("email") ?? 'מסתננת';
  componentType!: Type<any>;
  
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  @ViewChild(GenericBourdComponent) genericBourd!: GenericBourdComponent;

  data: any;
  selectedProject: string = 'ACME Corp. Backend App';
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
        console.log("this.tasks", this.tasks);
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
    this._leadService.getAllLeads().subscribe(
      (data: Lead[]) => {
        this.leads = data;
        console.log("this.leads", this.leads);
      },
      (error: any) => {
        console.error('Error fetching leads:', error);
      }
    );
    this._userService.getAll().subscribe((data: User[]) => {
      this.users = data
      this.user = data.find(u => u.email == this.currentEmail)
      if (!this.user)
        this.user.firstName = this.currentEmail
    },
      (error: any) => {
        console.error('Error fetching user:', error);
      }
    )
    this._customerService.GetAllCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        console.log("this.customers", this.customers);
        this.calculateStats();
        this.initChart();
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
      }
    );

    this.ProjectService.getAll().subscribe(
      (p: Array<Project>) => {
        this.projects = p;
        console.log("project=", this.projects);
        this.TaskService.getAllStatus().subscribe(
          (data) => {
            this.statuses = data
            console.log("this.statuses", this.statuses);
          }
        );
        this.TaskService.getAllPriorities().subscribe(
          (data) => {
            this.priorities = data
            console.log("this.priorities", this.priorities);

          }
        );
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.loading = true;
      })
    }
  
  calculateStats() {
    this.activeCustomers = this.customers.filter(customer => customer.status.description === 'Active').length;
    this.inactiveCustomers = this.customers.filter(customer => customer.status.description === 'Inactive').length;
    this.totalLeads = this.leads.length;
    console.log(this.activeCustomers, this.inactiveCustomers,);

  }

  initChart() {
    this.chartTaskDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: 400, // גובה מותאם אישית בפיקסלים
        width: '100%', // רוחב מלא של ה-container
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
      colors: ['#5CFFAC', '#A0A0A0', '#7F7F7F'], // Custom colors for your chart
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


  routing(list: any): void {
    this.filterData(list);
  }

  filterData(objToFilter: any): void {
    let taskFilter: Task[] = objToFilter;
    console.log(taskFilter);
    if (taskFilter.length != 0) {
      let loading: boolean = true;
      let col$types = { 'title': 'text', 'dueDate': 'date', 'createdDate': 'date' };
      let positionD = [this.statuses];
      let objData = [this.projects];
      let objFields = ['name'];
      if (this.genericBourd) {
        this.genericBourd.PopTable(taskFilter, loading, col$types, objData, objFields, positionD,"1000px");
      } else {
        console.error('genericBourd is not initialized');
      }
    } else {
      Swal.fire({
        text: 'no tasks',
        showCancelButton: false,
        showCloseButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: 'Close'
      });
    }
  }
 
    
  addLead() {
    this.componentType = AddLeadComponent;
    this.popUpAddOrEdit("Add Lead");
  }
  addTask() {
    this.componentType = AddTaskComponent;
    this.popUpAddOrEdit("Add Task");
  }
  addCustomer() {
    this.componentType = AddLeadComponent;
    this.popUpAddOrEdit("Add Lead");
  }

  popUpAddOrEdit(title: string) {
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
    // return this.tasks.filter(task => task.status?.description === "TO DO");
    return this.tasks.filter(task => task.status?.description === "Not Started");
  }
  getTodoTasksByUser(): Task[] {
    // return this.tasks.filter(task => task.status?.description === "TO DO");
    return this.tasks.filter(task => task.status?.description === "Not Started" && task.assignedTo?.email == this.user.email);
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
    // return this.tasks.filter(task => task.status?.description === "In PROGRESS");
    return this.tasks.filter(task => task.status?.description === "In Progress");
  }
  getInProgressTasksByUser(): Task[] {
    // return this.tasks.filter(task => task.status?.description === "In PROGRESS");
    return this.tasks.filter(task => task.status?.description === "In Progress" && task.assignedTo?.email == this.user.email);
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
    return this.tasks.filter(task => {
      if (task.dueDate) {
        return new Date(task.dueDate).toDateString() === today;
      }
      return false;
    })
  }
  getTasksDueTodayAndClosed(): Task[] {
    const today = new Date().toDateString();
    return this.tasks.filter(task => {
      if (task.dueDate) {
        // return new Date(task.dueDate).toDateString() === today&&task.status?.description=="DONE";
        return new Date(task.dueDate).toDateString() === today && task.status?.description == "Completed";
      }
      return false;
    })
  }
  getTasksOverdue(): Task[] {
    const now = new Date();
    console.log('Current date and time:', now.toISOString());

    return this.tasks.filter(task => {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        return dueDate < now && task.status?.description !== "Completed";
        // return dueDate < now && task.status?.description !== "DONE";
      }
      return false;
    });
  }
  getTasksOverdueFromYesterday(): Task[] {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateString = yesterday.toDateString();

    // מסנן את המשימות שתאריך ההגשה שלהן היה אתמול
    return this.tasks.filter(task => {
      if (task.dueDate) {
        return new Date(task.dueDate).toDateString() === yesterdayDateString;
      }
      return false;
    });
  }

  // ngOnInit(): void {
  //   // Get the data
  //   this._projectService.data$
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe((data) => {
  //       // Store the data
  //       this.data = data;

  //       // Prepare the chart data
  //       this._prepareChartData();
  //     });
  //   if (!window['Apex']) {
  //     window['Apex'] = {};
  //   }
  //   window['Apex'].chart = {
  //     events: {
  //       mounted: (chart: any, options?: any): void => {
  //         this._fixSvgFill(chart.el);
  //       },
  //       updated: (chart: any, options?: any): void => {
  //         this._fixSvgFill(chart.el);
  //       },
  //     },
  //   };
  // }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Fix the SVG fill references. This fix must be applied to all ApexCharts
   * charts in order to fix 'black color on gradient fills on certain browsers'
   * issue caused by the '<base>' tag.
   *
   * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
   *
   * @param element
   * @private
   */
  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this.router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
    Array.from(element.querySelectorAll('*[fill]'))
      // .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
      // .forEach((el) => {
      //   const attrVal = el.getAttribute('fill');
      //   el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))})`);
      // });
      .filter(el => {
        const fillAttr = el.getAttribute('fill');
        return fillAttr && fillAttr.indexOf('url(') !== -1;
      })

  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Github issues
    console.log("_prepareChartData");

    // this.chartGithubIssues = {
    //   chart: {
    //     fontFamily: 'inherit',
    //     foreColor: 'inherit',
    //     height: '100%',
    //     type: 'line',
    //     toolbar: {
    //       show: false,
    //     },
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   colors: ['#64748B', '#94A3B8'],
    //   dataLabels: {
    //     enabled: true,
    //     enabledOnSeries: [0],
    //     background: {
    //       borderWidth: 0,
    //     },
    //   },
    //   grid: {
    //     borderColor: 'var(--fuse-border)',
    //   },
    //   labels: this.data.githubIssues.labels,
    //   legend: {
    //     show: false,
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '50%',
    //     },
    //   },
    //   series: this.data.githubIssues.series,
    //   states: {
    //     hover: {
    //       filter: {
    //         type: 'darken',
    //         value: 0.75,
    //       },
    //     },
    //   },
    //   stroke: {
    //     width: [3, 0],
    //   },
    //   tooltip: {
    //     followCursor: true,
    //     theme: 'dark',
    //   },
    //   xaxis: {
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       color: 'var(--fuse-border)',
    //     },
    //     labels: {
    //       style: {
    //         colors: 'var(--fuse-text-secondary)',
    //       },
    //     },
    //     tooltip: {
    //       enabled: false,
    //     },
    //   },
    //   yaxis: {
    //     labels: {
    //       offsetX: -16,
    //       style: {
    //         colors: 'var(--fuse-text-secondary)',
    //       },
    //     },
    //   },
    // };
    // console.log("chartGithubIssues", this.chartGithubIssues);

    //// Task distribution
    // this.chartTaskDistribution = {
    //   chart: {
    //     fontFamily: 'inherit',
    //     foreColor: 'inherit',
    //     height: '100%',
    //     type: 'polarArea',
    //     toolbar: {
    //       show: false,
    //     },
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   labels: this.data.taskDistribution.labels,
    //   legend: {
    //     position: 'bottom',
    //   },
    //   plotOptions: {
    //     polarArea: {
    //       spokes: {
    //         connectorColors: 'var(--fuse-border)',
    //       },
    //       rings: {
    //         strokeColor: 'var(--fuse-border)',
    //       },
    //     },
    //   },
    //   series: this.data.taskDistribution.series,
    //   states: {
    //     hover: {
    //       filter: {
    //         type: 'darken',
    //         value: 0.75,
    //       },
    //     },
    //   },
    //   stroke: {
    //     width: 2,
    //   },
    //   theme: {
    //     monochrome: {
    //       enabled: true,
    //       color: '#93C5FD',
    //       shadeIntensity: 0.75,
    //       shadeTo: 'dark',
    //     },
    //   },
    //   tooltip: {
    //     followCursor: true,
    //     theme: 'dark',
    //   },
    //   yaxis: {
    //     labels: {
    //       style: {
    //         colors: 'var(--fuse-text-secondary)',
    //       },
    //     },
    //   },
    // };

    //// Budget distribution
    // this.chartBudgetDistribution = {
    //   chart: {
    //     fontFamily: 'inherit',
    //     foreColor: 'inherit',
    //     height: '100%',
    //     type: 'radar',
    //     sparkline: {
    //       enabled: true,
    //     },
    //   },
    //   colors: ['#818CF8'],
    //   dataLabels: {
    //     enabled: true,
    //     formatter: (val: number): string | number => `${val}%`,
    //     textAnchor: 'start',
    //     style: {
    //       fontSize: '13px',
    //       fontWeight: 500,
    //     },
    //     background: {
    //       borderWidth: 0,
    //       padding: 4,
    //     },
    //     offsetY: -15,
    //   },
    //   markers: {
    //     strokeColors: '#818CF8',
    //     strokeWidth: 4,
    //   },
    //   plotOptions: {
    //     radar: {
    //       polygons: {
    //         strokeColors: 'var(--fuse-border)',
    //         connectorColors: 'var(--fuse-border)',
    //       },
    //     },
    //   },
    //   series: this.data.budgetDistribution.series,
    //   stroke: {
    //     width: 2,
    //   },
    //   tooltip: {
    //     theme: 'dark',
    //     y: {
    //       formatter: (val: number): string => `${val}%`,
    //     },
    //   },
    //   xaxis: {
    //     labels: {
    //       show: true,
    //       style: {
    //         fontSize: '12px',
    //         fontWeight: '500',
    //       },
    //     },
    //     categories: this.data.budgetDistribution.categories,
    //   },
    //   yaxis: {
    //     max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
    //     tickAmount: 7,
    //   },
    // };

    // //Weekly expenses
    //   this.chartWeeklyExpenses = {
    //     chart: {
    //       animations: {
    //         enabled: false,
    //       },
    //       fontFamily: 'inherit',
    //       foreColor: 'inherit',
    //       height: '100%',
    //       type: 'line',
    //       sparkline: {
    //         enabled: true,
    //       },
    //     },
    //     colors: ['#22D3EE'],
    //     series: this.data.weeklyExpenses.series,
    //     stroke: {
    //       curve: 'smooth',
    //     },
    //     tooltip: {
    //       theme: 'dark',
    //     },
    //     xaxis: {
    //       type: 'category',
    //       categories: this.data.weeklyExpenses.labels,
    //     },
    //     yaxis: {
    //       labels: {
    //         formatter: (val): string => `$${val}`,
    //       },
    //     },
    //   };

    //   // Monthly expenses
    //   this.chartMonthlyExpenses = {
    //     chart: {
    //       animations: {
    //         enabled: false,
    //       },
    //       fontFamily: 'inherit',
    //       foreColor: 'inherit',
    //       height: '100%',
    //       type: 'line',
    //       sparkline: {
    //         enabled: true,
    //       },
    //     },
    //     colors: ['#4ADE80'],
    //     series: this.data.monthlyExpenses.series,
    //     stroke: {
    //       curve: 'smooth',
    //     },
    //     tooltip: {
    //       theme: 'dark',
    //     },
    //     xaxis: {
    //       type: 'category',
    //       categories: this.data.monthlyExpenses.labels,
    //     },
    //     yaxis: {
    //       labels: {
    //         formatter: (val): string => `$${val}`,
    //       },
    //     },
    //   };

    //   // Yearly expenses
    //   this.chartYearlyExpenses = {
    //     chart: {
    //       animations: {
    //         enabled: false,
    //       },
    //       fontFamily: 'inherit',
    //       foreColor: 'inherit',
    //       height: '100%',
    //       type: 'line',
    //       sparkline: {
    //         enabled: true,
    //       },
    //     },
    //     colors: ['#FB7185'],
    //     series: this.data.yearlyExpenses.series,
    //     stroke: {
    //       curve: 'smooth',
    //     },
    //     tooltip: {
    //       theme: 'dark',
    //     },
    //     xaxis: {
    //       type: 'category',
    //       categories: this.data.yearlyExpenses.labels,
    //     },
    //     yaxis: {
    //       labels: {
    //         formatter: (val): string => `$${val}`,
    //       },
    //     },
    //   };
    // }
  }
}