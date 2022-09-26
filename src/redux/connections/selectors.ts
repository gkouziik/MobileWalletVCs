import { RootState } from '../index';
import { Connection, ConnectionsState } from './index';

export const __REDUX_STATE_KEY__ = 'connections';

export const getReduxStateSlice = (state: RootState): ConnectionsState =>
  state[__REDUX_STATE_KEY__];

export const getConnections = (state: RootState): undefined | Connection[] =>
  getReduxStateSlice(state).connections;
