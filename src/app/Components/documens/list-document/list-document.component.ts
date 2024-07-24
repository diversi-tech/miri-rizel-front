import { Component, OnInit } from '@angular/core';
import { DocumentService } from '@app/Services/document.service';
import { ValidatorsService } from '@app/Services/validators.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-list-document',
    templateUrl: './list-document.component.html',
    styleUrls: ['./list-document.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor]
})
export class ListDocumentComponent implements OnInit {
  folders: any[] = []; 
  filteredFolders: any[] = [];
    files: any[] = [];   
  searchQuery: string = ''; 
  currentFolderId: string = ''; 
  constructor(
    private documentService: DocumentService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders(): void {
    this.documentService.getFolders().subscribe(folders => {
      console.log(folders);
      this.folders=folders
      this.filteredFolders = folders;
      console.log(this.folders)
    });
  }

  viewFolderContents(folderId: string): void {
    this.documentService.getFilesInFolder(folderId).subscribe(files => {
      if(files.length>0){

   Swal.fire({
  title: 'תוכן התקיה',
  html: `
    <style>
      .file-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }
      .file-item {
        width: 120px;
        text-align: center;
      }
      .file-thumbnail {
        width: 100px;
        height: auto;
        display: block;
        margin: 0 auto;
      }
      .file-name {
        margin-top: 5px;
        font-size: 14px;
        word-wrap: break-word;
      }
    </style>
    <div class="file-grid">
      ${files.map(file => `
        <div class="file-item">
          <a href="${file.webViewLink}" target="_blank">
            <img src="${file.thumbnailLink}" alt="${file.name}" class="file-thumbnail" />
            <div class="file-name">${file.name}</div>
          </a>
        </div>
      `).join('')}
    </div>
  `,
  showCloseButton: true,
  showConfirmButton: false,
});
}
     else
     {
      Swal.fire({
        title: 'אין מסמכים זמינים ללקוח זה'})
     } 
    });
  }
  
  
  
  
  
  filterFolders(): void {
    if (this.searchQuery) {
      this.filteredFolders = this.folders.filter(folder =>
        folder.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredFolders = this.folders;
    }
  }
}
