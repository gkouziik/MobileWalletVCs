import { ConnectionActionTypes, ConnectionsState, SET_CONNECTIONS } from './types';

const initialState: ConnectionsState = {
  connections: undefined,
};

/**
 * TODO edw prepei na exei kai delete connection kanonika
 */
const connections = (state = initialState, action: ConnectionActionTypes) => {
  switch (action.type) {
    case 'SET_CONNECTIONS':
      return {
        ...state,
        connections: action.payload,
      };
    default:
      return state;
  }
};

export default connections;
