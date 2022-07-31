import {
  DELETE_DID_KEY,
  DELETE_USER_TOKEN,
  SET_DID_KEY,
  SET_LOADING,
  SET_USER_TOKEN,
  SET_WALLET_PRE_CREATION_DATA,
  UserActionTypes,
  UserState,
} from './types';

const initialState: UserState = {
  userToken: '',
  isLoading: true,
  walletLabel: '',
  walletRetrievePassword: '',
  didKey: undefined,
};

const user = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case DELETE_USER_TOKEN:
      return {
        ...state,
        userToken: '',
      };
    case DELETE_DID_KEY:
      return {
        ...state,
        didKey: undefined,
      };
    case SET_WALLET_PRE_CREATION_DATA:
      return {
        ...state,
        walletRetrievePassword: action.payload.walletRetrievePassword,
        walletLabel: action.payload.walletLabel,
      };
    case SET_DID_KEY:
      return {
        ...state,
        didKey: action.payload,
      };
    default:
      return state;
  }
};

export default user;
