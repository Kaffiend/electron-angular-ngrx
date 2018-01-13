import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as people from '../../actions/people.actions';
import * as fromPeople from '../../reducers';
import { Person } from '../../models/people';
import { Observable } from 'rxjs/Observable';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'kaf-people-page',
  templateUrl: 'people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})

export class PeoplePageComponent implements OnInit {

  people$: Observable<any>;

  constructor(
    private store: Store<fromPeople.State>,
    private electronService: ElectronService
  ) {
    this.people$ = this.store.select(fromPeople.getAllPeople);
    this.electronService.ipcRenderer.on('res:people', (event, payload) => {
      this.store.dispatch(new people.LoadPeopleSuccess(payload));
    });
  }

  ngOnInit() {
    this.store.dispatch(new people.LoadPeople);
  }
}
