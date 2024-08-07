import { Component, EventEmitter, Output } from '@angular/core';
import { SheetsApiService } from '@app/Services/sheets-api.service';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-export-to-sheet',
    templateUrl: './export-to-sheet.component.html',
    styleUrls: ['./export-to-sheet.component.css'],
    standalone: true,
    imports: [FormsModule, NgIf, NgFor, MatButtonModule, RadioButtonModule, TranslateModule, 
      DropdownModule,
      ButtonModule,
      InputTextModule,]
})
export class ExportToSheetComponent {
  formValues: any = {
    selectedOption: '',
    fileName: '',
    selectedFile: '',
    selectedSheetOption: '',
    sheetName: '',
    selectedSheet: ''
  };

  @Output() exportData = new EventEmitter<any>();

  constructor(
    private sheetsAPI: SheetsApiService,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.existingFiles=await this.sheetsAPI.listGoogleSheets();
  }

  existingFiles: any = [];

  onSubmit(): void {
    this.exportData.emit(this.formValues as any);
    Swal.close();
  }

  onRadioChange(event: any): void {
    this.formValues.selectedOption = event.target.value;
  }
  async onSheetOptionChange(event: any): Promise<void> {
    this.formValues.selectedSheetOption = event.target.value;
  }

}
