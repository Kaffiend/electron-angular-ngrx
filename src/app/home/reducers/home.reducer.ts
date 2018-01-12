import { Action } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { HomeActions, HomeActionTypes } from '../actions/home.actions';
import { Person, peopleAdapter } from '../entities/people.entity';

export interface State extends EntityState<Person> {
  selectedUserId: number | null;
}

export const initialState: State = peopleAdapter.getInitialState({
  selectedUserId: null
});

export function reducer(state = initialState, action: HomeActions): State {
  switch (action.type) {

    case HomeActionTypes.LoadPeopleSuccess: {
      return peopleAdapter.addAll(action.payload.people, state);
    }

    case HomeActionTypes.AddPerson: {
      return peopleAdapter.addOne(action.payload.person, state);
    }

    default:
      return state;
  }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;
