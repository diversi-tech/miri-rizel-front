import { Component } from '@angular/core';
import { DocumentService } from '@app/Services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  constructor(private documentService:DocumentService){

  }
  file!:File;
  upFile(){
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
 this.documentService.upFile(formData).subscribe(res=>
  alert('הקובץ הועלה בהצלחה'));
       
    }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
    }
    this.upFile()
  }
}
