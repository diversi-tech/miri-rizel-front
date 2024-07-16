import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // הצבה של משתני הדיאלוג
    this.title = this.data.title;
    this.context = this.data.context;
    this.buttonText = this.data.buttonText;
  }

  // משתני הדיאלוג
  title: string = '';
  context: string = '';
  buttonText: string = '';
}
