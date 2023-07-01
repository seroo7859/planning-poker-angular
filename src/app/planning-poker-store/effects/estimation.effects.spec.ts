import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EstimationEffects } from './estimation.effects';

describe('EstimationEffects', () => {
  let actions$: Observable<any>;
  let effects: EstimationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EstimationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EstimationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
