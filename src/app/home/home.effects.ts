import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HomeActions, HomeActionTypes } from './home.actions';

@Injectable()
export class HomeEffects {

  @Effect()
  effect$ = this.actions$.ofType(HomeActionTypes.HomeAction);

  constructor(private actions$: Actions) {}
}
