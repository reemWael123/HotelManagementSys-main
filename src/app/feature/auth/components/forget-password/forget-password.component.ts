import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  loading: boolean = false;

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private _auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  submit(): void {
    this.forgetPasswordForm.markAllAsTouched();

    if (this.forgetPasswordForm.valid) {
      this._auth
        .forgetPassword(this.forgetPasswordForm.value as string)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response?.message ?? '',
            });

            this.router.navigateByUrl('auth/reset-password');
          },
         
        });
    }
  }
}
