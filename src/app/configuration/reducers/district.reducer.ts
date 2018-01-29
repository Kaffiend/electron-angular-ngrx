import { Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { District } from '../models/district';

export interface State extends EntityState<District> {
  selectedDistrictId: string | null;
}

export function sortByName(a: District, b: District) {
  return a.name.localeCompare(b.name);
}

export const districtAdapter: EntityAdapter<District> = createEntityAdapter<District>({
  selectId: (district: District) => district.id,
  sortComparer: sortByName
});

export const initialState: State = districtAdapter.getInitialState({
  selectedDistrictId: null
});

export function reducer(state = initialState, action: any): State {
  switch (action.type) {

    default: {
      return state;
    }
  }
}

export const getSelectedDistrictId = (state: State) => state.selectedDistrictId;

