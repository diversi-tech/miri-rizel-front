import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: String): Observable<any> {
    // Implement dummy logic here if needed
    return of({});
  }
}
