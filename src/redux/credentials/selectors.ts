import { RootState } from '../index';
import { CredentialsState, PendingRequest } from './index';

export const __REDUX_STATE_KEY__ = 'credentials';

export const getReduxStateSlice = (state: RootState): CredentialsState =>
  state[__REDUX_STATE_KEY__];

export const getPendingCredentials = (state: RootState): undefined | PendingRequest[] =>
  getReduxStateSlice(state).pendingRequests;

export const getAcceptedLabelCredentials = (state: RootState): [] | string[] =>
  getReduxStateSlice(state).acceptedRequestsLabels;
