import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AuthAction = '[Auth] Action'
}

export class Auth implements Action {
  readonly type = AuthActionTypes.AuthAction;
}

export type AuthActions = Auth;
