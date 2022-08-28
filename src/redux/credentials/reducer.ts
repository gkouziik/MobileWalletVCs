import {
  CredentialsActionTypes,
  CredentialsState,
  SET_ACCEPTED_LABEL,
  SET_PENDING_REQUESTS,
} from './types';

const initialState: CredentialsState = {
  pendingRequests: undefined,
  acceptedRequestsLabels: [{ acceptedLabel: undefined }],
};

const credentials = (state = initialState, action: CredentialsActionTypes) => {
  console.log(action.type, action.payload, 'to payload ston reDUCER');
  console.log(state.acceptedRequestsLabels, 'to state');
  switch (action.type) {
    case SET_PENDING_REQUESTS:
      return {
        ...state,
        pendingRequests: action.payload,
      };
    case SET_ACCEPTED_LABEL:
      return {
        ...state,
        acceptedRequestsLabels: [
          ...state.acceptedRequestsLabels,
          { acceptedLabel: action.payload },
        ],
      };
    default:
      return state;
  }
};

export default credentials;
