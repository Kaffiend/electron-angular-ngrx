import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PeopleActions, PeopleActionTypes } from '../actions/people.actions';

@Injectable()
export class PeopleEffects {

  @Effect()
  effect$ = this.actions$.ofType(PeopleActionTypes.LoadPeople);

  constructor(private actions$: Actions) {}
}
