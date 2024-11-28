import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken');
  const _Router = inject(Router);
  if (token !== null) {
    _Router.navigate(['/landing']);
    return false;
  } else {
    return true;
  }
};
