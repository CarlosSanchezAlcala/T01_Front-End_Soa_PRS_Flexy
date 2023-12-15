import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(!authService.getIsLoggerd()){
    router.navigate(['/']);
    return false;
  }
  return true;
};
