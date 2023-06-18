import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BacklogEffects } from './backlog.effects';

describe('BacklogEffects', () => {
  let actions$: Observable<any>;
  let effects: BacklogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BacklogEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BacklogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
