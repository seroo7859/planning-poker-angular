import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DiscussionEffects } from './discussion.effects';

describe('DiscussionEffects', () => {
  let actions$: Observable<any>;
  let effects: DiscussionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiscussionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DiscussionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
