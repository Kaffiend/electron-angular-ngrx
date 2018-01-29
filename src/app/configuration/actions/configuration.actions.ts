import { Action } from '@ngrx/store';

export enum ConfigurationActionTypes {
  ConfigurationAction = '[Configuration] Action'
}

export class Configuration implements Action {
  readonly type = ConfigurationActionTypes.ConfigurationAction;
}

export type ConfigurationActions = Configuration;
