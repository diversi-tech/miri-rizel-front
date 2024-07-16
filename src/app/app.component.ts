import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavComponent, RouterOutlet]
})
export class AppComponent {
  value:any
  title = 'copyRight';
}
