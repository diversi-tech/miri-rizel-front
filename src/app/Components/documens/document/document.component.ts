import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentService } from '@app/Services/document.service';
import { ValidatorsService } from '@app/Services/validators.service';
import Swal from 'sweetalert2';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/Components/dialog/dialog.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  standalone: true,
  providers: [MessageService],
  imports: [FormsModule, FileUploadModule, BadgeModule, ReactiveFormsModule, CommonModule, NgIf, NgFor, InputTextModule, TranslateModule]
})
export class DocumentComponent implements OnInit {
  file!: File;
  files: File[] = [];
  documentForm!: FormGroup;
  submitted: boolean = false;
  private originalParent: HTMLElement | null = null;
  trueTitle: boolean = false;
  nameCustomer!: string;
  totalSize: number = 0;
  totalSizePercent: number = 0;
  date!: Date;

  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private vlidatorsService: ValidatorsService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      documentId: [0],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      filePath: ['', [Validators.required]],
      relatedTo: ['', [Validators.required]],
      relatedId: [0, [Validators.required]],
      createdDate: ['', [Validators.required]],
    });
    this.openEditDocumentPopup();
  }

  get formControls() { return this.documentForm.controls; }

  customNameValidator(): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      return this.vlidatorsService.name(control.value) ? null : { invalidName: 'השם לא תקין' };
    };
  }

  setName(name: string) {
    this.nameCustomer = name;
  }

  openEditDocumentPopup() {
    const formElement = document.getElementById("addDocument");
    if (formElement) {
      this.originalParent = formElement.parentElement;

      Swal.fire({
        html: `<div id="popupContainer"></div>`,
        showConfirmButton: false,
        didOpen: () => {
          const container = document.getElementById('popupContainer');
          if (container) {
            container.appendChild(formElement);
            formElement.style.display = 'block';
          }
        },
        willClose: () => {
          this.documentForm.reset();
          if (formElement && this.originalParent) {
            formElement.style.display = 'none';
            this.originalParent.appendChild(formElement);
          }
        }
      });
    }
  }
  onSelected(event: any): void {
    this.files = event.currentFiles;
    this.totalSize = this.files.reduce((acc, file) => acc + file.size, 0);
    this.totalSizePercent = this.totalSize / 10000000 * 100;



  }

  onSelectedFiles(event: File): void {
    const title = this.documentForm.controls['title'].value;
    const formData = new FormData();
    formData.append('file', event, title);
    this.spinner.show();
    this.documentService.upFile(formData, this.nameCustomer).subscribe(() => {
      this.spinner.hide();
      Swal.close();
    });
  }
  addDocumentSubmit(): void {
    this.submitted = true;

    if (this.files[0] == null) {
      return;
    }
    this.onSelectedFiles(this.files[0]);
  }
  changeTitle() {
    this.trueTitle = true;
  }
  formatSize(bytes: number): string {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  onRemoveTemplatingFile(event: Event, file: File, removeFileCallback: Function, index: number) {
    removeFileCallback(file);
    this.files.splice(index, 1);
    this.totalSize -= file.size;
    this.totalSizePercent = this.totalSize / 10000000 * 100;
  }
  choose(event: Event, chooseCallback: Function) {
    chooseCallback();
  }
  uploadHandler(event: any) {
    const formData = new FormData();
    for (const file of event.files) {
      formData.append('files', file, file.name);
    }
  }
  customUploadHandler(event: any) {
    const files = event.files;
    this.onSelectedFiles(files[0]);
  }
}
