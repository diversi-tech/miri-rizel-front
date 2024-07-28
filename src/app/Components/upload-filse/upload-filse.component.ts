import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DocumentService } from '@app/Services/document.service';
import { ValidatorsService } from '@app/Services/validators.service';
import Swal from 'sweetalert2';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-upload-filse',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule,FormsModule, ReactiveFormsModule, NgIf, InputTextModule, TranslateModule],
  templateUrl: './upload-filse.component.html',
  styleUrl: './upload-filse.component.css',
  providers: [MessageService]

})
export class UploadFilseComponent implements OnInit {
    files: File[] = [];
    totalSize: number = 0;
    totalSizePercent: number = 0;
    documentForm!: FormGroup;
    submitted: boolean = false;
    trueTitle: boolean = false;
    nameCustomer!: string;
    date!: Date;
  
    constructor(
      private documentService: DocumentService,
      private formBuilder: FormBuilder,
      private vlidatorsService: ValidatorsService,
      private config: PrimeNGConfig,
      private messageService: MessageService
    ) {  this.nameCustomer = 'your_default_name'; // קביעת ערך ברירת מחדל או ערך רלוונטי
    }
  
    ngOnInit(): void {
      this.documentForm = this.formBuilder.group({
        documentId: [0],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        filePath: ['', [Validators.required]],
        // relatedTo: ['', [Validators.required]],
        // relatedId: [0, [Validators.required]],
        // createdDate: ['', [Validators.required]],
      });
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
  
    onSelectedFiles(event: any): void {
      this.files = event.currentFiles;
      this.totalSize = this.files.reduce((acc, file) => acc + file.size, 0);
      this.totalSizePercent = this.totalSize / 10000000 * 100;
      
      if (this.files.length > 0) {
        const file = this.files[0];
        this.documentForm.patchValue({ filePath: file.name });
      }
    }
  
    addDocumentSubmit(): void {
        this.submitted = true;
      
        if (this.documentForm.invalid) {
          console.log('Form is invalid:', this.documentForm.errors);
          Object.keys(this.documentForm.controls).forEach(key => {
            const controlErrors: ValidationErrors | null = this.documentForm.get(key)!.errors;
            if (controlErrors != null) {
              console.log('Key control: ' + key + ', error: ' + JSON.stringify(controlErrors));
            }
          });
          return;
        }
      
        // מילוי השדות החסרים לפני השליחה
        this.documentForm.patchValue({
          createdDate: new Date(),
          relatedTo: 'someRelatedValue' // החלף בערך המתאים לפי ההקשר שלך
        });
      
        const formData = new FormData();
        formData.append('file', this.files[0], this.documentForm.get('title')?.value);
      
        // וידוא שהמשתנה nameCustomer מכיל ערך
        if (!this.nameCustomer) {
          console.error('nameCustomer is not defined');
          return;
        }
      
        this.documentService.upFile(formData, this.nameCustomer).subscribe(res => {
          this.documentForm.patchValue({ filePath: res });
          this.documentService.addDocument(this.documentForm.value).subscribe((res) => {            
            alert('הקובץ הועלאה בהצלחה');
            this.documentService.sendEmail(this.nameCustomer).subscribe();
          });
        });
      }
      
  
    changeTitle() {
      this.trueTitle = true;
    }
  
    choose(event: Event, chooseCallback: Function) {
      chooseCallback();
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
  }