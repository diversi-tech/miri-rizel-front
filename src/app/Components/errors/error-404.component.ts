import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-error-404',
  standalone: true,
  imports      : [TranslateModule,RouterLink],
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.css']
})
export class error404Component {

constructor(){}

}
