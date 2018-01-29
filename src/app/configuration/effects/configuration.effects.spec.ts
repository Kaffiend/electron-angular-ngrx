import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ConfigurationEffects } from './configuration.effects';

describe('ConfigurationService', () => {
  let actions$: Observable<any>;
  let effects: ConfigurationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ConfigurationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
