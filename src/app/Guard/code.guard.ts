import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ResetPasswordService } from '@app/Services/reset-password.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CodeGuard implements CanActivate {

  private validateCode(inputCode: string): boolean {
    const validCode = this.codeService.getServerPassword();
    return inputCode === validCode?.toString();
  }

  constructor(private codeService: ResetPasswordService, private translate: TranslateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: 'הכנס את קוד האימות שנשלח אליך במייל',
        html: `
          <div style="display: flex; justify-content: center; gap: 10px;">
            <input type="text" id="digit1" maxlength="1" style="width: 60px; height: 50px; text-align: center; font-size: 24px; border: none; border-bottom: 2px solid #000;" />
            <input type="text" id="digit2" maxlength="1" style="width: 60px; height: 50px; text-align: center; font-size: 24px; border: none; border-bottom: 2px solid #000;" />
            <input type="text" id="digit3" maxlength="1" style="width: 60px; height: 50px; text-align: center; font-size: 24px; border: none; border-bottom: 2px solid #000;" />
            <input type="text" id="digit4" maxlength="1" style="width: 60px; height: 50px; text-align: center; font-size: 24px; border: none; border-bottom: 2px solid #000;" />
            <input type="text" id="digit5" maxlength="1" style="width: 60px; height: 50px; text-align: center; font-size: 24px; border: none; border-bottom: 2px solid #000;" />
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'אשר',
        cancelButtonText: 'בטל',
        didOpen: () => {
          const inputs = Array.from(document.querySelectorAll('input[id^="digit"]')) as HTMLInputElement[];

          inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
              if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
              }
            });

            input.addEventListener('keydown', (e: KeyboardEvent) => {
              if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
              }
            });

            input.addEventListener('paste', (e: ClipboardEvent) => {
              e.preventDefault();
              const pasteData = e.clipboardData?.getData('text').slice(0, 5) || '';
              pasteData.split('').forEach((char, i) => {
                if (inputs[i]) {
                  inputs[i].value = char;
                }
              });
              const lastInput = inputs[pasteData.length - 1];
              if (lastInput) {
                lastInput.focus();
              }
            });
          });

          // Store inputs in a globally accessible variable
          (window as any).inputs = inputs;
        },
        preConfirm: () => {
          const inputs = (window as any).inputs as HTMLInputElement[];
          const code = inputs.map(input => input.value).join('');
          if (code.length === 5 && this.validateCode(code)) {
            return true;
          } else {
            Swal.showValidationMessage('הקוד שהוזן אינו תקין');
            return false;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}