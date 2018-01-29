import { Action } from '@ngrx/store';
import {
  Actions,
  FormGroupState,
  createFormGroupState,
  formGroupReducer,
  SetValueAction,
  createFormGroupReducerWithUpdate,
  validate
} from 'ngrx-forms';
import {
  required,
  maxLength,
  minLength
} from 'ngrx-forms/validation';

export interface DistrictFormState {
  districtName: string;
  quickCode: string;
}
export const FORM_ID = 'DISTRICT_FORM';

export const initialFormState = createFormGroupState<DistrictFormState>(FORM_ID, {
  districtName: '',
  quickCode: ''
});

export const districtFormsReducer = createFormGroupReducerWithUpdate<DistrictFormState>({
  districtName: validate(required),
  quickCode: validate([required, maxLength(3), minLength(2)])
});

export function reducer(
  state = initialFormState,
  action: Actions<FormGroupState<DistrictFormState>>
): FormGroupState<DistrictFormState> {
  const districtForm = districtFormsReducer(state, action);
  if (districtForm !== state) {
    state = {...districtForm};
  }

  switch (action.type) {
    default:
      return state;
  }
}
