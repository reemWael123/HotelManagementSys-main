import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/login-request';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../interfaces/login-response';
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  response: LoginResponse;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  user: SocialUser;
  loggedIn: boolean;
  private accessToken = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private socialService: SocialAuthService
  ) {}

  ngOnInit() {
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.loginWithGoogle();
    });
  }

  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle(this.user.idToken).subscribe({
      next: (res) => {
      },
    });
  }

  onLogin(data: FormGroup) {
    this.loginForm.markAllAsTouched();
    if (data.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(data.value as LoginRequest).subscribe({
      next: (res) => {
        this.response = res;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.response.message,
        } );
        
        setTimeout(() => {
          localStorage.setItem('userToken', this.response.data.token);
          localStorage.setItem('userName', this.response.data.user.userName);

          localStorage.setItem('role', this.response.data.user.role);
          if (this.response.data.user.role == 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (this.response.data.user.role == 'user') {
            this.router.navigate(['/landing']);
          }
        }, 1000);
      },
    });
  }
}
