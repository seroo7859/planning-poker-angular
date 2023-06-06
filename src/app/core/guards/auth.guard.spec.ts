import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from "@angular/router";

import { authGuard } from './auth.guard';

describe('AuthGuardGuard', () => {
  let guard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
