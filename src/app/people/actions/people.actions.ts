import { Action } from '@ngrx/store';
import { Person } from 'app/people/entities/people.entity';

export enum PeopleActionTypes {
  LoadPeople = '[People] Load People',
  LoadPeopleSuccess = '[People] Load People Success',
  LoadPeopleFailure = '[People] Load Poeple Failure',
  AddPerson = '[People] Add Person',
  UpdatePerson = '[People] Update Person',
  DeletePerson = '[People] Delete Person',
  ClearPeople = '[People] Clear People'
}


export class LoadPeople implements Action {
  readonly type = PeopleActionTypes.LoadPeople;
}

export class LoadPeopleSuccess implements Action {
  readonly type = PeopleActionTypes.LoadPeopleSuccess;
  constructor(public payload: {people: Person[]}) {}
}

export class LoadPeopleFailure implements Action {
  readonly type = PeopleActionTypes.LoadPeopleFailure;
}

export class AddPerson implements Action {
  readonly type = PeopleActionTypes.AddPerson;
  constructor(public payload: {person: Person}) {}
}

export type PeopleActions =
 LoadPeople
 | LoadPeopleSuccess
 | LoadPeopleFailure
 | AddPerson;
