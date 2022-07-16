import {
  DELETE_USER_TOKEN,
  SET_LOADING,
  SET_USER_TOKEN,
  UserActionTypes,
  UserState,
} from './types';

const initialState: UserState = {
  userToken: '',
  isLoading: true,
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
    default:
      return state;
  }
};

export default user;
