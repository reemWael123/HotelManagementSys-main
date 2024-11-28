export interface ResetPasswordRequest {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
