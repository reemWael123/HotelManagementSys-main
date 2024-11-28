import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

import { MatchFieldValidator } from 'src/app/shared/validators/match-field-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading: boolean = false;

  profileImage: any;

  registerForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^01[0-9]{9}$'),
      ]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  updateProfileImage(e: any): void {
    this.profileImage = e;
  }

  submit(): void {
    this.registerForm.markAllAsTouched();

    if (!this.profileImage) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please upload your profile picture',
      });
    }

    if (this.registerForm.valid && this.profileImage) {
      const registerFormData: FormData = new FormData();

      for (const [key, value] of Object.entries(this.registerForm.value)) {
        registerFormData.append(key, value as string);
      }

      registerFormData.append('profileImage', this.profileImage as string);
      registerFormData.append('role', 'user');

      this._auth.register(registerFormData).subscribe({
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
