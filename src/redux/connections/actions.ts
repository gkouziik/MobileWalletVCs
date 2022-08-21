import { ReceiveInvitationParamsType } from '../../providers/connections/types';
import { simpleAction, ThunkDispatchType } from '../../redux/utils';
import connectionsApi from '../../providers/connections';
import { Connection, SET_CONNECTIONS, SetConnectionsAction } from '../connections';

export const setConnectionsAction = (params: Connection[]): SetConnectionsAction =>
  simpleAction(SET_CONNECTIONS, params);

export const receiveInvitationAction = (
  params: ReceiveInvitationParamsType,
  onCallback: (connection_id?: string, error?: Error) => void
) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const { request: receiveInvitationRequest } = connectionsApi.single.receiveInvitation(params);
      const response = await receiveInvitationRequest();
      onCallback(response.connection_id, undefined);
      // dispatch(acceptInvitationAction(response.connection_id));
    } catch (error) {
      onCallback(undefined, error as Error);
    }
  };
};

export const acceptInvitationAction = (
  connection_id: string,
  onAcceptInvitationCallback: (error?: Error) => void
) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const { request: acceptInvitationRequest } =
        connectionsApi.single.acceptInvitation(connection_id);
      const response = await acceptInvitationRequest();
      console.log(response, 'to response sto accept connection');
      onAcceptInvitationCallback();
    } catch (error) {
      onAcceptInvitationCallback(error as Error);
    }
  };
};

export const getConnectionsAction = () => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const { request: getConnectionsRequest } = connectionsApi.single.getConnections();
      const response = await getConnectionsRequest();
    } catch (error) {}
  };
};
