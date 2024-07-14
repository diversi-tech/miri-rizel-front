import { Component, OnInit } from '@angular/core';
import { DocumentService } from '@app/Services/document.service';
import { ValidatorsService } from '@app/Services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {
  folders: any[] = []; // שינוי מ-files ל-folders
  filteredFolders: any[] = [];  // תיקיות לאחר סינון
  files: any[] = [];    // מסמכים מה-API
  searchQuery: string = '';  // מילות הסינון של המשתמש
  currentFolderId: string = ''; 
  constructor(
    private documentService: DocumentService,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit() {
    this.loadFolders(); // שינוי מה-loadFiles ל-loadFolders
  }

  loadFolders(): void {
    this.documentService.getFolders().subscribe(folders => {
      console.log(folders); // בדיקת הנתונים המתקבלים מהשרת
      // מסננים רק את התקיות ומעדכנים את המערך folders
      // this.folders = folders.filter(folder => folder.mimeType === 'application/vnd.google-apps.folder');
      this.folders=folders
      this.filteredFolders = folders;
      console.log(this.folders); // בדיקת התקיות בלבד
    });
  }

  viewFolderContents(folderId: string): void {
    this.documentService.getFilesInFolder(folderId).subscribe(files => {
      Swal.fire({
        title: 'תוכן התקיה',
        html: `<div class="file-grid">${files.map(file => `
          <div class="file-item">
            <a href="${file.webViewLink}" target="_blank">
              <img src="${file.thumbnailLink}" alt="${file.name}" class="file-thumbnail" />
              <div class="file-name">${file.name}</div>
            </a>
          </div>
        `).join('')}</div>`,
        showCloseButton: true,
        showConfirmButton: false,
      });
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
