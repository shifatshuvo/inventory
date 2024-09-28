import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('user')) {
    return true;
  }

  // Redirect to sign-in page if not logged in
  router.navigate(['/auth/sign-in']);
  return false; // Prevent access to the route
};
