import { Action } from '@ngrx/store';
import { HomeActions, HomeActionTypes } from './home.actions';
import { Person } from 'app/home/home.models';

export interface State {
  people: Person[];
}

export const initialState: State = {
  people: []
};

export function reducer(state = initialState, action: HomeActions): State {
  switch (action.type) {

    case HomeActionTypes.HomeAction:
      return state;


    default:
      return state;
  }
}
