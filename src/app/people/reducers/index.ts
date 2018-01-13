import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers/root.reducer';
import * as fromPeople from './people.reducer';

export interface PeopleState {
  people: fromPeople.State;
}

export interface State extends fromRoot.State {
  'people': PeopleState;
}

export const reducers = {
  people: fromPeople.reducer
};

export const getPeopleState = createFeatureSelector<PeopleState>('people');

export const getPeopleEntitiesState = createSelector(
  getPeopleState,
  state => state.people
);

export const getSelectedPersonId = createSelector(
  getPeopleEntitiesState,
  fromPeople.getSelectedPersonId
);

export const {
  selectIds: getPeopleIds,
  selectEntities: getPeopleEntities,
  selectAll: getAllPeople,
  selectTotal: getTotalPeople
} = fromPeople.peopleAdapter.getSelectors(getPeopleEntitiesState);

export const getSelectedPerson = createSelector(
  getPeopleEntities,
  getSelectedPersonId,
  (entites, selectedId) => {
    return selectedId && entites[selectedId];
  }
);
