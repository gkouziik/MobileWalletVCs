import {
  CredentialsActionTypes,
  CredentialsState,
  SET_ACCEPTED_LABEL,
  SET_PENDING_REQUESTS,
} from './types';

const initialState: CredentialsState = {
  pendingRequests: undefined,
  acceptedRequestsLabels: [],
};

const credentials = (state = initialState, action: CredentialsActionTypes) => {
  switch (action.type) {
    case SET_PENDING_REQUESTS:
      return {
        ...state,
        pendingRequests: action.payload,
      };
    case SET_ACCEPTED_LABEL:
      return {
        ...state,
        acceptedRequestsLabels: [...state.acceptedRequestsLabels, action.payload],
      };
    default:
      return state;
  }
};

export default credentials;
