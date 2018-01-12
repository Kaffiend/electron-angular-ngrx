import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { HomeEffects } from './home.effects';

describe('HomeService', () => {
  let actions$: Observable<any>;
  let effects: HomeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(HomeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
