import { Component} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@app/Services/language.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterLink, TranslateModule],
})
export class NavComponent {

  constructor(public translate: TranslateService, private languageService: LanguageService) {
    translate.setDefaultLang('he');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.languageService.setLanguage(language);
  }
}
