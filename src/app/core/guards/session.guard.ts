import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { SessionService } from "../services/session.service";

export const sessionGuard = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isJoinedSession()) {
    return true;
  }
  return router.navigate(['app', 'onboarding']);
};
