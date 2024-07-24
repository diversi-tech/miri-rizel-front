import { Component} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@app/Services/language.service';
import { NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterLink, TranslateModule,NgIf, MatMenuModule,MatButtonModule],
})
export class NavComponent {
  showOptions: boolean = false;

  constructor(public translate: TranslateService, private languageService: LanguageService) {
    translate.setDefaultLang('he');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.languageService.setLanguage(language);
  }
  

  updateDetails(): void {
    console.log('Update details clicked')
  }
}
