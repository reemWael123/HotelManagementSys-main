import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const userGuard: CanActivateFn = ( route, state ) => {
  
  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('role');
  const _Router = inject(Router);
  if (token !== null && role === 'user') {
    return true;
  } else {
    _Router.navigate(['/landing']);
    return false;
  }
};
