import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-auth-code-dialog',
    templateUrl: './auth-code-dialog.component.html',
    styleUrls: ['./auth-code-dialog.component.css'],
    standalone: true,
    imports: [
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        TranslateModule,
    ],
})
export class AuthCodeDialogComponent {
  code: string[] = ['', '', '', '', ''];
  value: any;

  constructor(
    public dialogRef: MatDialogRef<AuthCodeDialogComponent>,
    private codeService: ResetPasswordService,
    private translate:TranslateService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  validateCode(): void {
    const validCode = this.codeService.getServerPassword();
    const enteredCode = this.code.join('');
    if (enteredCode === validCode?.toString()) {
      this.dialogRef.close(true);
    } else {
      this.translate.get(['errorCode']).subscribe(translation=> 
        Swal.fire({
        text:translation['errorCode'] ,
        icon: "error",
        showCancelButton: false,
        showCloseButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "סגור"
      }))
    }
  }

  @ViewChildren('input0, input1, input2, input3, input4')
  inputs!: QueryList<any>;

  focusNext(event: any, index: number): void {
    if (event.inputType === 'insertFromPaste') {
      const pastedData = event.clipboardData.getData('text');
      if (pastedData.length === 5) {
        for (let i = 0; i < 5; i++) {
          this.code[i] = pastedData[i];
        }
        this.inputs.toArray()[4].nativeElement.focus();
        return;
      }
    }
    if (
      event.target.value.length === event.target.maxLength &&
      index < this.inputs.length
    ) {
      this.inputs.toArray()[index].nativeElement.focus();
    }
  }

  focusPrevious(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.code[index] && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }
}
