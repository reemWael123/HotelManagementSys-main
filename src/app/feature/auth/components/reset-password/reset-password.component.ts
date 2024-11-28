import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

import { ResetPasswordRequest } from '../../interfaces/reset-password-request';

import { MatchFieldValidator } from './../../../../shared/validators/match-field-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  loading: boolean = false;

  value = false;

  resetPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      seed: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{4}'),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [MatchFieldValidator('password', 'confirmPassword')]
  );

  constructor(
    private _auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  submit(): void {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      this._auth
        .resetPassword(this.resetPasswordForm.value as ResetPasswordRequest)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response?.message ?? '',
            });

            this.router.navigateByUrl('auth/login');
          },
        });
    }
  }
}
