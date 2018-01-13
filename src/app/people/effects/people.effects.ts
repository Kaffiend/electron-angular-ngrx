import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as people from '../actions/people.actions';
import { Person } from '../models/people';
import rxIpc from 'rx-ipc-electron/lib/renderer';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PeopleEffects {

  @Effect()
  load$ = this.actions$.ofType(people.PeopleActionTypes.LoadPeople)
    .switchMap(() => {
      return rxIpc.runCommand('send-seeds')
        .mergeMap((seeds: Person[]) => of(new people.LoadPeopleSuccess({people: seeds})));
    });

  constructor(private actions$: Actions) {}
}
