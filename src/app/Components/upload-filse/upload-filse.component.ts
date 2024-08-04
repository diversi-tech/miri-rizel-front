import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
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
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '@app/Model/User';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-filse',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, NgIf, InputTextModule, TranslateModule],
  templateUrl: './upload-filse.component.html',
  styleUrl: './upload-filse.component.css',
  providers: [MessageService]

})
export class UploadFilseComponent implements OnInit,OnChanges {
  files: File[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  documentForm!: FormGroup;
  submitted: boolean = false;
  trueTitle: boolean = false;
  nameCustomer: string|any;
  date!: Date;
  @Input() user: User|any
  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder,
    private vlidatorsService: ValidatorsService,
    private spinner:NgxSpinnerService,
  private translate:TranslateService) { }

  ngOnInit(): void {    
    this.nameCustomer=this.user?this.user.firstName+" "+this.user.lastName:"חריגים"
    this.documentForm = this.formBuilder.group({
      documentId: [0],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      filePath: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      console.log("ngOnChanges",this.user);
      this.nameCustomer=this.user?this.user.firstName+" "+this.user.lastName:"חריגים"
    }
  }
  get formControls() { return this.documentForm.controls; }

  // customNameValidator(): (control: FormControl) => ValidationErrors | null {
  //   return (control: FormControl): ValidationErrors | null => {
  //     return this.vlidatorsService.name(control.value) ? null : { invalidName: 'השם לא תקין' };
  //   };
  // }

  // setName(name: string) {
  //   this.nameCustomer = name;
  // }

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
    // debugger
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

    this.documentForm.patchValue({
      createdDate: new Date(),
      relatedTo: this.nameCustomer,
      relatedId:this.user?this.user.userId:4
    });

    const formData = new FormData();
    formData.append('file', this.files[0], this.documentForm.get('title')?.value);

    if (!this.user) {
      console.error('nameCustomer is not defined');
      return;
    }
    this.spinner.show()
    this.documentService.upFile(formData, this.nameCustomer).subscribe(res => {  
    this.spinner.hide()  
    this.translate.get('upLoadFile').subscribe(translion=>
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: translion,
      showConfirmButton: false,
      timer: 2500
    }));
    this.documentForm.patchValue({ filePath: res });    
    // this.documentService.addDocument(this.documentForm.value,this.nameCustomer).subscribe(res => {     
    //   },(error: any) => {
    //     console.error('Error addDocument :', error);
    //   })
    },
    (error: any) => {
      this.spinner.hide()    
      console.error('Error upFile :', error);
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