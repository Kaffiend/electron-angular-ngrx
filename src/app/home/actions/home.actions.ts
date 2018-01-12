import { Action } from '@ngrx/store';

export enum HomeActionTypes {
  HomeAction = '[Home] Action'
}

export class Home implements Action {
  readonly type = HomeActionTypes.HomeAction;
}

export type HomeActions = Home;
