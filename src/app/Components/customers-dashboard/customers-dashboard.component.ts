import { Component, OnInit } from '@angular/core';
import { UploadFilseComponent } from '../upload-filse/upload-filse.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-customers-dashboard',
  standalone: true,
  imports: [UploadFilseComponent,NgFor,NgIf],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.css'
})
export class CustomersDashboardComponent implements OnInit {
  customerName: string = 'לקוח פלוני'; // זהות הלקוח, ניתן להחליף במידע אמיתי

  constructor() { }

  ngOnInit(): void {
    // כאן אפשר לטעון מידע על הלקוח מהשרת
  }
}
