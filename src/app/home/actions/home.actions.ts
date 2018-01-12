import { Action } from '@ngrx/store';
import { Person } from 'app/home/entities/people.entity';

export enum HomeActionTypes {
  LoadPeople = '[Home] Load People',
  LoadPeopleSuccess = '[Home] Load People Success',
  LoadPeopleFailure = '[Home] Load Poeple Failure',
  AddPerson = '[Home] Add Person',
  UpdatePerson = '[Home] Update Person',
  DeletePerson = '[Home] Delete Person',
  ClearPeople = '[Home] Clear People'
}


export class LoadPeople implements Action {
  readonly type = HomeActionTypes.LoadPeople;
}

export class LoadPeopleSuccess implements Action {
  readonly type = HomeActionTypes.LoadPeopleSuccess;
  constructor(public payload: {people: Person[]}) {}
}

export class LoadPeopleFailure implements Action {
  readonly type = HomeActionTypes.LoadPeopleFailure;
}

export class AddPerson implements Action {
  readonly type = HomeActionTypes.AddPerson;
  constructor(public payload: {person: Person}) {}
}

export type HomeActions =
 LoadPeople
 | LoadPeopleSuccess
 | LoadPeopleFailure
 | AddPerson;
