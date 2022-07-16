export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const DELETE_USER_TOKEN = 'DELETE_USER_TOKEN';
export const SET_LOADING = 'SET_LOADING';

export interface UserState {
  userToken: string;
  isLoading: boolean;
}

export interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface DeleteUserTokenAction {
  type: typeof DELETE_USER_TOKEN;
}

export type UserActionTypes = SetUserTokenAction | DeleteUserTokenAction | SetLoadingAction;
