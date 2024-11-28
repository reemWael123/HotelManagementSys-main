import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PaymentService } from './../../feature/landing/services/payment.service';
export const paymentGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const _Router = inject(Router);
  const _payment = inject(PaymentService);

  if (_payment.id) {
    return true;
  } else {
    _Router.navigate(['/landing']);
    return false;
  }
};
