import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  const sessionId = state.url.split('/').pop();
  if (sessionId) {
    return router.navigate(['app', 'onboarding', 'join-session'], { queryParams: { id: sessionId }});
  }

  return router.navigate(['app', 'onboarding']);
};
