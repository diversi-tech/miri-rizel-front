import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';

interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  filterType?: string;
}
interface position {
  id: number
  description: string
}

@Component({
    selector: 'app-generic-bourd',
    templateUrl: './generic-bourd.component.html',
    styleUrls: ['./generic-bourd.component.css'],
    standalone: true,
    imports: [
        ToolbarModule,
        SharedModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        NgFor,
        NgIf,
        DropdownModule,
        FormsModule,
        TagModule,
        MultiSelectModule,
        DatePipe,
    ],
})
export class GenericBourdComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() globalFilterFields: string[] = [];
  @Input() positionData: any[] = [];
  @Input() objData: any[] = [];
  @Input() objFields: string[] = [];
  @Input() posFields: string[] = [];
  @Input() col$types: any = {};
  @Input() popTable!: boolean;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() addDocument = new EventEmitter<any>();
  @Output() showAddComponent = new EventEmitter<any>();
  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  @ViewChild('dt') dt!: Table;
  constructor(private resolver: ComponentFactoryResolver) { }

  columns: Column[] = [];
  isListView: boolean = true;
  layout: string = 'list';
  ngOnInit() {
    if (this.data === undefined || (this.objData.length > 0 && this.objFields == null)) {
      throw new Error('The data input is required and must be provided.');
    }
    this.generateColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.generateColumns();
    }
  }
  toggleView(): void {
    this.isListView = !this.isListView;
  }
  getToggleView() {
    return this.isListView
  }
  onEdit(rowData: any) {
    this.edit.emit(rowData);
  }
document(rowData: any){
  this.addDocument.emit(rowData);
}
  onDelete(rowData: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(rowData);
      }
    });

  }

  generateColumns() {
    if (this.data.length === 0) {
      this.columns = [];
      return;
    }
    const firstItem = this.data[0];
    if (!firstItem) return;
    this.columns = [];
    Object.keys(this.col$types).forEach((key) => {
      this.columns.push({
        field: key,
        header: this.capitalizeFirstLetter(key),
        sortable: true,
        filterType: this.col$types[key]
      });
    })
    if (this.popTable == true)
      this.columns.push({
        field: 'popTable',
        header: '',
        sortable: false,
        filterType: 'popTable'
      });
    this.columns.push({
      field: 'edit',
      header: '',
      sortable: false,
      filterType: 'edit'
    });
    this.columns.push({
      field: 'delete',
      header: '',
      sortable: false,
      filterType: 'delete'
    });
    this.columns.push({
      field: 'document',
      header: '',
      sortable: false,
      filterType: 'document'
    });
    if (this.globalFilterFields.length == 0 || !this.globalFilterFields) {
      this.columns.forEach(c => this.globalFilterFields.push(c.field))
    }
    if (this.positionData.length == 0 || !this.positionData) {
      console.log(this.positionData);
    }
  }

  getSeverity(status: string) {    
    switch (status) {
      case 'TO DO':
        return 'danger';

      case 'In PROGRESS':
        return 'info';

      case 'DONE':
        return 'success';

      case 'High':
        return 'danger';

      case 'Low':
        return 'success';

      case 'Medium':
        return 'info';

      default:
        return 'null';
    }
  }

  capitalizeFirstLetter(field: string) {
    let string = field.replace(/([A-Z])/g, ' $1').toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getTypeOfCol(col: Column, i: number) {
    if (col.filterType == 'date')
      this.data[i][col.field] = new Date(this.data[i][col.field])
    return col.filterType
  }
  getPosData(i: number) {
    let index: number = 0
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'position')
        index++;      
    return this.positionData[index]
  }
  getObjData(i: number) {
    let index: number = 0
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'obj')
        index++;
    return this.objData[index]

  }
  getobjFields(i: number): string {
    let index: number = 0
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'obj')
        index++;
    return this.objFields[index]

  }

  getposFields(i: number): string {
    let index: number = 0
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'position')
        index++;
    return this.posFields[index]

  }

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(input.value, 'contains');
    }
  }

  getDataForPopTable(obj: any) {
    this.dataUpdated.emit(obj)
  }
  getPosition(item: any, i: number): string {
    // debugger
    // let List<any> n= this.getposData(i)
    return item.description
  }
  PopTable(data: any, loading: boolean, col$types: any, Data1?: any, objFields?: string[], Data2?: any[]) {
    Swal.fire({
      title: 'Details',
      html: '<div id="popupContainer"></div>',
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(GenericBourdComponent);
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.data = data;
          componentRef.instance.loading = loading;
          componentRef.instance.globalFilterFields = ['title', 'description', 'priority', 'status', 'dueDate'];
          componentRef.instance.col$types = col$types;
          if (Data2 == null && objFields != null) {
            componentRef.instance.objData = Data1;
            componentRef.instance.objFields = objFields;
          } else if (Data2 == null)
            componentRef.instance.positionData = Data1;
          else if (objFields != null) {
            componentRef.instance.objData = Data1;
            componentRef.instance.objFields = objFields;
            componentRef.instance.positionData = Data2;
            componentRef.instance.posFields = this.posFields;
          }
          container.appendChild(componentRef.location.nativeElement);
          componentRef.instance.loading = false
        }
      },
    });
  }
  openAddComponent() {
    debugger
    this.showAddComponent.emit();
  };
}