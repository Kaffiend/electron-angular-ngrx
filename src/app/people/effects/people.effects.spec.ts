import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { PeopleEffects } from './people.effects';

describe('PeopleService', () => {
  let actions$: Observable<any>;
  let effects: PeopleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PeopleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
