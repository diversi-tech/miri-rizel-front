import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  filterType?: string;
}

@Component({
  selector: 'app-generic-bourd',
  templateUrl: './generic-bourd.component.html',
  styleUrls: ['./generic-bourd.component.css'],
})
export class GenericBourdComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() globalFilterFields: string[] = [];
  @Input() positionData: any[] = [];
  @Input() objData: any[] = [];
  @Input() objFields: string[] = [];
  @Input() col$types: any = {};
  @Input() popTable!: boolean;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() dataUpdated = new EventEmitter<any>();

  @ViewChild('dt') dt!: Table;

  columns: Column[] = [];
  statuses = [
    { label: 'InProgress', value: 'InProgress' },
    { label: 'Complited', value: 'Complited' },
    { label: 'Beginning', value: 'Beginning' },

  ];
  ngOnInit() {
    if ( this.data === undefined||(this.objData.length>0&&this.objFields==null)) {
      throw new Error('The data input is required and must be provided.');
    }
    this.generateColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.generateColumns();
    }
  }
  onEdit(rowData: any) {
    this.edit.emit(rowData);
  }

  onDelete(rowData: any) {
    this.delete.emit(rowData);
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
    if(this.popTable==true)
      this.columns.push({
        field: 'popTable',
        header: 'Show ღ',
        sortable: false,
        filterType: 'popTable'
      });
    this.columns.push({
      field: 'edit',
      header: 'Edit',
      sortable: false,
      filterType: 'edit'
    });
    this.columns.push({
      field: 'delete',
      header:'Delete',
      sortable: false,
      filterType: 'delete'
    });

  }


  getSeverity(status: string) {
    switch (status) {
      case 'a':
        return 'danger';

      case 'Complited':
        return 'success';

      case 'Beginning':
        return 'info';

      case 'InProgress':
        return 'warning';

      case 'renewal':
        return 'null';

      default:
        return 'null';

    }
  }

  capitalizeFirstLetter(field: string) {
   let string= field.replace(/([A-Z])/g, ' $1').toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getTypeOfCol(col: Column, i: number) {
    return col.filterType
  }
  getpositionData(i: number) {
    let index: number = 0
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'priority')
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

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(input.value, 'contains');
    }
  }

  getDataForPopTable(obj: any) {
    this.dataUpdated.emit(obj)
  }
  
  PopTable(data: any) {
    console.log("hooooooo", data);
  }

}
