import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';


@Component({
  selector: 'app-auth-code-dialog',
  templateUrl: './auth-code-dialog.component.html',
  styleUrls: ['./auth-code-dialog.component.css'],
})
export class AuthCodeDialogComponent {
  code: string[] = ['', '', '', '', ''];

  constructor(
    public dialogRef: MatDialogRef<AuthCodeDialogComponent>,
    private codeService: ResetPasswordService
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
      alert('קוד לא תקין, נסה שוב.');
    }
  }

  @ViewChildren('input0, input1, input2, input3, input4')
  inputs!: QueryList<any>;

  focusNext(event: any, index: number): void {
    if (
      event.target.value.length === event.target.maxLength &&
      index < this.inputs.length
    ) {
      this.inputs.toArray()[index].nativeElement.focus();
    }
  }
}