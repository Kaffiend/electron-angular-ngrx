import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as people from '../actions/people.actions';
import { Person } from '../models/people';
import { ElectronService } from 'ngx-electron';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PeopleEffects {

  @Effect({dispatch: false})
  load$ = this.actions$.ofType(people.PeopleActionTypes.LoadPeople)
    .do(() => this.electron.ipcRenderer.send('req:people'));


  constructor(private actions$: Actions, private electron: ElectronService) {}
}
