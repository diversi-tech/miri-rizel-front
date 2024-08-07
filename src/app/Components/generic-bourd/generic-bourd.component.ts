import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { SheetsApiService } from '@app/Services/sheets-api.service';
import { Table, TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { ExportToSheetComponent } from '@app/Components/export-to-sheet/export-to-sheet.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { LanguageService } from '@app/Services/language.service';

interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  filterType?: string;
}
interface position {
  id: number;
  description: string;
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
        TooltipModule,
        TableModule,
        InputTextModule,
        NgFor,
        NgIf,
        DropdownModule,
        FormsModule,
        TagModule,
        MultiSelectModule,
        TranslateModule,
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
  @Input() col$types: any = {};
  @Input() popTable!: boolean;
  @Input() hideEditButton: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() documentation = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() addDocument = new EventEmitter<any>();
  @Output() showAddComponent = new EventEmitter<any>();
  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;
  @ViewChild('dt') dt!: Table;
  constructor(
    private resolver: ComponentFactoryResolver,
    private sheetsAPI: SheetsApiService,
    private languageService: LanguageService,
    private translate:TranslateService
  ) {}

  columns: Column[] = [];
  isListView: boolean = true;
  layout: string = 'list';
  textDirection = 'rtl'; // ברירת מחדל עברית

  ngOnInit() {
    if (
      this.data === undefined ||
      (this.objData.length > 0 && this.objFields == null)
    ) {
      throw new Error('The data input is required and must be provided.');
    }
    this.generateColumns();
     this.languageService.language$.subscribe(lang => {
      this.textDirection = lang === 'he' ? 'rtl' : 'ltr';
    });
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
    return this.isListView;
  }
  onEdit(rowData: any) {
    this.edit.emit(rowData);
  }
document(rowData: any){
  this.addDocument.emit(rowData);
}

  onPropil(rowData: any) {
    this.documentation.emit(rowData);
  }

  onDelete(rowData: any) {
    this.translate.get(['sure','revert','revertTrue','cancel']).subscribe(translation=> 
    Swal.fire({
      title:translation['sure'],
      text:translation['revert'],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: translation['cancel'],
      confirmButtonText: translation['revertTrue'],
    })
  .then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(rowData);
      }
    }))
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
        header: key,
        sortable: true,
        filterType: this.col$types[key],
      });
    });
    if (this.popTable == true)
      this.columns.push({
        field: 'popTable',
        header: '',
        sortable: false,
        filterType: 'popTable',
      });
    this.columns.push({
      field: 'edit',
      header: '',
      sortable: false,
      filterType: 'edit',
    });
    this.columns.push({
      field: 'delete',
      header: '',
      sortable: false,
      filterType: 'delete',
    });
    this.columns.push({
      field: 'documentation',
      header: '',
      sortable: false,
      filterType: 'documentation'
    });
    this.columns.push({
      field: 'document',
      header: '',
      sortable: false,
      filterType: 'document'
    });
    if (this.globalFilterFields.length == 0 || !this.globalFilterFields) {
      this.columns.forEach((c) => this.globalFilterFields.push(c.field));
    }
    if (this.positionData.length == 0 || !this.positionData) {
    }
   }

  getSeverity(status: string) {
    switch (status) {
      case 'TO DO':
        return 'danger';

      case 'IN PROGRESS':
        return 'info';

      case 'COMPLETE':
        return 'success';

      case 'HIGH':
        return 'danger';

      case 'LOW':
        return 'success';

      case 'MEDIUM':
        return 'info';

      default:
        return undefined;
    }
  }

  // capitalizeFirstLetter(field: string) {
  //   let string = field.replace(/([A-Z])/g, ' $1').toLowerCase();
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  getTypeOfCol(col: Column, i: number) {
    if (col.filterType == 'date')
      this.data[i][col.field] = new Date(this.data[i][col.field]);
    return col.filterType;
  }
  //מחזיר את המערך של הפוזישן הרצוי
  getPosData(i: number) {
    let index: number = 0;
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'position') index++;
    return this.positionData[index];
  }
  //מחזיר את המערך של אוביקטים הרצוי
  getObjData(i: number) {
    let index: number = 0;
    for (let c = 0; c < i; c++)
      if (this.columns[c].filterType == 'obj') index++;
    return this.objData[index];
  }
  //מחזיר את השדה של האוביקט שאותו רוצים להראות
  getobjFields(i: number, type: string): string {
    if (type == 'obj') {
      let index: number = 0;
      for (let c = 0; c < i; c++)
        if (this.columns[c].filterType == 'obj') index++;
      return this.objFields[index];
    } else if (type == 'position') return 'description';
    else return '';
  }

  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(input.value, 'contains');
    }
  }

  getDataForPopTable(obj: any) {
    this.dataUpdated.emit(obj);
  }
  getPosition(item: any, i: number): string {
    // debugger
    // let List<any> n= this.getposData(i)
    return item.description;
  }
  PopTable(
    data: any,
    loading: boolean,
    col$types: any,
    Data1?: any,
    objFields?: string[],
    Data2?: any[],
    customWidth?: string,
    deleteCallBack?: (rowdata: any) => void,
    edit?: boolean,
  ) {
    Swal.fire({
      title: 'Details',
      html: '<div id="popupContainer"></div>',
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(
            GenericBourdComponent
          );
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.data = data;
          componentRef.instance.loading = loading;
          componentRef.instance.globalFilterFields = [
            'title',
            'description',
            'priority',
            'status',
            'dueDate',
          ];
          componentRef.instance.col$types = col$types;
          if (Data2 == null && objFields != null) {
            componentRef.instance.objData = Data1;
            componentRef.instance.objFields = objFields;
          } else if (Data2 == null) componentRef.instance.positionData = Data1;
          else if (objFields != null) {
            componentRef.instance.objData = Data1;
            componentRef.instance.objFields = objFields;
            componentRef.instance.positionData = Data2;
          }
          container.appendChild(componentRef.location.nativeElement);
          componentRef.instance.loading = false;
          if (edit)  componentRef.instance.hideEditButton = edit 
          // 
          if (deleteCallBack)
            componentRef.instance.onDelete = deleteCallBack
          // 
        }
        if (customWidth) {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.width = customWidth; // קביעת רוחב מותאם אישית
          }
        }
       

      },
    });
  }
  openAddComponent() {
    this.showAddComponent.emit();
  }
  d(b: any) {}

  //גוגל שיטס
  async spreadSheetsFromTableData<T extends {}>(data: T[]) {
    await this.sheetsAPI.handleAuthClick();
    //פתיחת הפופ אפ
    await this.showPopupSheet();
  }
  //פופ-אפ
  async showPopupSheet(): Promise<void> {
    Swal.fire({
      // title: ' XSL-יצוא נתוני טבלה זו ל',
      html: '<div id="popupContainer"></div>',
      showCancelButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const container = document.getElementById('popupContainer');
        if (container) {
          const factory = this.resolver.resolveComponentFactory(
            ExportToSheetComponent
          );
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.exportData.subscribe((eventData: any) => {
            this.exportToSpreadSheet(eventData);
          });
          container.appendChild(componentRef.location.nativeElement);
        }
      },
      // preConfirm: () => {
      //   const container = document.getElementById('popupContainer');
      //   if (!container) {
      //     Swal.showValidationMessage('שגיאה פנימית: רכיב לא נמצא.');
      //     return null;
      //   }
      //   const componentRef = this.popupContainer.get(0) as any;
      //   if (!componentRef || !componentRef.instance) {
      //     Swal.showValidationMessage('שגיאה פנימית: רכיב לא נמצא.');
      //     return null;
      //   }
      //   const formValues = componentRef.instance.formValues;
      //   if (!formValues.selectedOption) {
      //     Swal.showValidationMessage('בחר אפשרות!');
      //     return null;
      //   }
      //   if (formValues.selectedOption === 'newDoc' && !formValues.fileName) {
      //     Swal.showValidationMessage('תן שם לקובץ!');
      //     return null;
      //   }
      //   if (
      //     formValues.selectedOption === 'existingDoc' &&
      //     !formValues.selectedFile
      //   ) {
      //     Swal.showValidationMessage('בחר מסמך קיים!');
      //     return null;
      //   }
      //   if (
      //     formValues.selectedSheetOption === 'newSheet' &&
      //     !formValues.sheetName
      //   ) {
      //     Swal.showValidationMessage('תן שם לגליון!');
      //     return null;
      //   }
      //   if (
      //     formValues.selectedSheetOption === 'existingSheet' &&
      //     !formValues.selectedSheet
      //   ) {
      //     Swal.showValidationMessage('בחר גליון קיים!');
      //     return null;
      //   }
      //   return formValues;
      // }
    })
  }      
  //קבלת מידע הטופס ופניה לפונקציה המתאימה
  async exportToSpreadSheet(eventData: any): Promise<void> {
    const arrayOfArraysData = this.objectsToArrayOfArrays(this.data);
    const titles: string[]=await this.translateTitles(arrayOfArraysData[0]);
    arrayOfArraysData[0]=titles;
    if (eventData.selectedOption === 'newDoc') {
      if (eventData.fileName != null)
        this.sheetsAPI.ExportDataToNewSheet(
          arrayOfArraysData,
          eventData.fileName
        );
      else this.sheetsAPI.ExportDataToNewSheet(arrayOfArraysData, 'MyTitle');
    } else {
      if (eventData.selectedOption === 'existingDoc') {
        //הוספת גיליון לאותו גוגל שיטס קיים והכנסית המידע לתוכו
        this.sheetsAPI.addSheetToExistingSpreadsheet(
          arrayOfArraysData,
          eventData.selectedFile,
          eventData.sheetName
        );
      } else {
        this.sheetsAPI.ExportDataToExistSheet(
          arrayOfArraysData,
          eventData.selectedFile
        );
      }
    }
  }

  //קבלת הנתונים בצורת מערכים שמתאימה לייצוא
  objectsToArrayOfArrays<T extends {}>(data: T[]): string[][] {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    let columnsToSheets: Column[] = [];

    Object.keys(this.col$types).forEach((key) => {
      columnsToSheets.push({
        field: key,
        header: key,
        sortable: true,
        filterType: this.col$types[key],
      });
    });
    //const keys = Object.keys(data[0]);
    const result: string[][] = [columnsToSheets.map((c) => c.field)]; // Header row with strings

    let numColumn = 0;
    let rowIndex = 0;
    data.forEach((obj) => {
      numColumn = 0;
      const row = columnsToSheets.map((key) => {
        const value = (obj as any)[key.field];

        let p =
          value !== null && value !== undefined
            ? key.filterType == 'obj'
              ? String(value[this.getobjFields(numColumn, 'obj')])
              : key.filterType == 'position'
              ? String(value[this.getobjFields(numColumn, 'position')])
              : String(value)
            : '';
        numColumn++;
        return p;
      });
      result.push(row);
      rowIndex++;
    });
    return result;
  }

  translateTitles(titles: string[]) :Promise<string[]>{
    //return titles.forEach(title=> this.translate.get(title).subscribe(translation=> title= translation));
    const translationPromises = titles.map(title => 
      this.translate.get(title).toPromise()
    );

    return Promise.all(translationPromises);
  }

  // dir: string="";
  // changeLanguage(lang: string){
  //   if(lang=='en') this.dir= 'ltr';
  //   else this.dir= 'rtl';
  // }
}
