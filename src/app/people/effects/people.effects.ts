import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as people from '../actions/people.actions';
import { Person } from '../models/people';
import { ElectronService } from 'ngx-electron';
import { map, switchMap, startWith, tap } from 'rxjs/operators';

@Injectable()
export class PeopleEffects {

  @Effect({dispatch: false})
  load$ = this.actions$.ofType(people.PeopleActionTypes.LoadPeople)
    .pipe(tap(() => this.electron.ipcRenderer.send('req:people')));

  constructor(private actions$: Actions, private electron: ElectronService) {}
}
