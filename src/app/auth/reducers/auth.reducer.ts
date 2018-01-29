import { Action } from '@ngrx/store';
import { User } from '../models/user';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
