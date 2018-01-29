import { Action } from '@ngrx/store';
import { District } from '../models/district';
import * as fromRoot from '../../reducers/root.reducer';
import * as fromDistrictForm from './district-form.reducer';
import * as fromDistricts from './district.reducer';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

export interface ConfigurationState {
  districtForm: FormGroupState<fromDistrictForm.DistrictFormState>;
  districts: fromDistricts.State;
}

export interface State extends fromRoot.State {
  configuration: ConfigurationState;
}

export const reducers = {
  districtForm: fromDistrictForm.reducer,
  districts: fromDistricts.reducer
};

export const getConfigurationState = createFeatureSelector<ConfigurationState>('configuration');

export const getDistrictFormState = createSelector(
  getConfigurationState,
  state => state.districtForm
);

export const getDistrictEntitiesState = createSelector(
  getConfigurationState,
  state => state.districts
);
