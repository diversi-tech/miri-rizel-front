import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommunicationService } from '@app/Services/communication.service';
import { Communication } from '@app/Model/Communication';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GenericBourdComponent } from '../generic-bourd/generic-bourd.component';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import Swal from 'sweetalert2';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-propil',
  templateUrl: './propil.component.html',
  styleUrls: ['./propil.component.css'],
  standalone: true,
  imports: [ToolbarModule,
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
    DatePipe,NgIf,NgFor,CommonModule, DatePipe,GenericBourdComponent,MatIconModule, MatButtonModule, MatRippleModule, MatMenuModule, MatTabsModule, MatButtonToggleModule, NgApexchartsModule, MatTableModule, NgClass, CurrencyPipe]
})
export class PropilComponent implements OnInit {
  @Input() communication!: Communication;
  responses: Communication[] = [];
  responseForm!: FormGroup;
  
  @Output() deleteMessageEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.fetchResponses();
    this.initializeForm();
  }

  fetchResponses(): void {
    this.communicationService.readAll().subscribe(res => {
      this.responses = res.filter(comm => comm.relatedId === this.communication.communicationId);
    });
  }

  initializeForm(): void {
    this.responseForm = this.formBuilder.group({
      details: [''],
      communicationId: [0],
      type: [''],
      date: [new Date()],
      relatedId: [this.communication.communicationId],
      name: []
    });
  }

  sendResponse(): void {
    if (!this.responseForm.valid) {
      return;
    }
    this.communicationService.AddNewCommunication(this.responseForm.value).subscribe(() => {
      this.fetchResponses();
      this.responseForm.reset();
      this.responseForm.patchValue({ relatedId: this.communication.communicationId, date: new Date() });
    });
  }

  deleteMessage(message: any): void {
    this.communicationService.deleteCommunication(message.communicationId).subscribe(() => {
      this.deleteMessageEvent.emit(message);
    });
  }

}