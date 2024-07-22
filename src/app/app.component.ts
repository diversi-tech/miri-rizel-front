import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule,NavComponent, RouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2000);
  }

  value: any
  title = 'CopyRight';
}
