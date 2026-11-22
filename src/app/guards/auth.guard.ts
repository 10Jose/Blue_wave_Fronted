import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


function useAuthContext() {
  return {
    authService: inject(AuthService),
    router: inject(Router),
    platformId: inject(PLATFORM_ID),
  };
}

export const authGuard = () => {
  const { authService, router, platformId } = useAuthContext();

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/Login']);
  return false;
};

export const noAuthGuard = () => {
  const { authService, router, platformId } = useAuthContext();

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }

  return true;
};