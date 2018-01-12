import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HomeActions, HomeActionTypes } from '../actions/home.actions';

@Injectable()
export class HomeEffects {

  @Effect()
  effect$ = this.actions$.ofType(HomeActionTypes.LoadPeople);

  constructor(private actions$: Actions) {}
}
