import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from "@angular/router";

import { sessionGuard } from './session.guard';

describe('SessionGuard', () => {
  let guard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(sessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
