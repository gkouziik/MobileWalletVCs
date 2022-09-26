export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const DELETE_USER_TOKEN = 'DELETE_USER_TOKEN';
export const SET_LOADING = 'SET_LOADING';
export const SET_WALLET_PRE_CREATION_DATA = 'SET_WALLET_PRE_CREATION_DATA';
export const SET_DID_KEY = 'SET_DID_KEY';
export const DELETE_DID_KEY = 'DELETE_DID_KEY';

export interface UserState {
  userToken: string;
  isLoading: boolean;
  walletLabel: string;
  walletRetrievePassword: string;
  didKey: string | undefined;
}

export interface SetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  payload: string;
}

export type SetWalletPreCreationDataPayloadType = {
  walletLabel: string;
  walletRetrievePassword: string;
};

export interface SetWalletPreCreationDataAction {
  type: typeof SET_WALLET_PRE_CREATION_DATA;
  payload: SetWalletPreCreationDataPayloadType;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface DeleteUserTokenAction {
  type: typeof DELETE_USER_TOKEN;
}

export interface DeleteDidKeyAction {
  type: typeof DELETE_DID_KEY;
}

export interface SetDidKeyAction {
  type: typeof SET_DID_KEY;
  payload: string;
}

export type UserActionTypes =
  | SetUserTokenAction
  | DeleteUserTokenAction
  | SetLoadingAction
  | SetWalletPreCreationDataAction
  | DeleteDidKeyAction
  | SetDidKeyAction;
