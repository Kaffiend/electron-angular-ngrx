import { createSelector, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PeopleActions, PeopleActionTypes } from '../actions/people.actions';

/**
 * Terminology of Entity is derived from an instance of a domain object stored in a database.
 * @ngrx/entity's interaction with collections is in a database-like manner, hence its name.
 * So we use our Models to create Entities, with which we can interact with in a familiar way via
 * standardized selectors.
 */
import { Person } from '../models/people';

/**
 * By extending State with EntityState of type Person @ngrx/entity handles the structure of our collection
 * so that it can be accessed in efficient and performant means. Any additional members you need to track
 * of your collection can be extended here.
 */
export interface State extends EntityState<Person> {
  selectedPersonId: string | null;
}

export function sortByName(a: Person, b: Person) {
  return a.name.localeCompare(b.name);
}

/**
 * Think of an entityAdapter as a Service that contains all your standard CRUD operations, that then
 * consume a repository to interact with your data (Simple Repository Pattern).
 * The configuration object takes a record id selector function and a sortComparer option which is
 * set to a compare function if the records are to be sorted.
 */

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (person: Person) => person.id,
  sortComparer: sortByName
});


export const initialState: State = peopleAdapter.getInitialState({
  selectedPersonId: null
});

export function reducer(state = initialState, action: PeopleActions): State {
  switch (action.type) {
    case PeopleActionTypes.LoadPeopleSuccess: {
      return peopleAdapter.addAll(action.payload, state);
    }
    case PeopleActionTypes.ClearPeople: {
      return peopleAdapter.removeAll(state);
    }
    default: {
      return state;
    }
  }
}

export const getSelectedPersonId = (state: State) => state.selectedPersonId;
