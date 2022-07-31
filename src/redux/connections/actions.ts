import { ReceiveInvitationParamsType } from '../../providers/connections/types';
import { ThunkDispatchType } from '../../redux/utils';
import connectionsApi from '../../providers/connections';

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
