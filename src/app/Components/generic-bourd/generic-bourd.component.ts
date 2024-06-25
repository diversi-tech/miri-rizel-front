import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  columns: Column[] = [];

  ngOnInit() {
    this.generateColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.generateColumns();
    }
  }

  generateColumns() {
    if (this.data.length === 0) {
      this.columns = [];
      return;
    }
    
    const firstItem = this.data[0];
    if (!firstItem) return;
    
    this.columns = [];
    for (const key in firstItem) {
      console.log(firstItem);
      
      if (firstItem.hasOwnProperty(key)) {
        let d=new Date(firstItem[key])
        let s=!isNaN(d.getTime())?'date':'text'
        
        this.columns.push({
          field: key,
          header: this.capitalizeFirstLetter(key),
          sortable: true, // אפשר לשנות בהתאם לצורך
          filterType: s
        });
      }
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getTypeOfCol(col:Column){
   return col.filterType
  }
}
