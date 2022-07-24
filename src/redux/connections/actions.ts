import { ReceiveInvitationParamsType } from '../../providers/connections/types';
import { ThunkDispatchType } from '../../redux/utils';
import connectionsApi from '../../providers/connections';

export const receiveInvitationAction = (params: ReceiveInvitationParamsType) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const { request: receiveInvitationRequest } = connectionsApi.single.receiveInvitation(params);
      const response = await receiveInvitationRequest();
      console.log(response.connection_id, 'response connection id');
      /**
       * sto success request kaleis to callback pou kanei trigger
       * to modal gia na kanei accept to invitation
       * kai sto callback stelneis mazi to connection_id
       * an to kanei accept kaneis trigger to parakatw action gia na kanei to connection
       * meta ton paei sto tab connections opou ekei tha exeis pull to refresh gia
       * na tou ferneis ta connections kai tha ta deixneis se flatlist kartes
       */
      dispatch(acceptInvitationAction(response.connection_id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptInvitationAction = (connection_id: string) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      console.log(connection_id);
      const { request: acceptInvitationRequest } =
        connectionsApi.single.acceptInvitation(connection_id);
      const response = await acceptInvitationRequest();
      console.log(response, 'response accept');
      /**
       *       edw vazeis ena toast oti egine to connection kai sto on callback ton kaneis
       *       navigate sthn karta me ta connections opou kaneis get connections request
       *       kai exeis kai pull to refresh gia na ta pairnei synexeia
       */
    } catch (error) {
      console.log(error, 'to error mesa sto accept invitation');
    }
  };
};

export const getConnectionsAction = () => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      console.log('edw mpainei');
      const { request: getConnectionsRequest } = connectionsApi.single.getConnections();
      const response = await getConnectionsRequest();
      console.log(response, 'to response mesa sto get connections');
    } catch (error) {
      console.log(error, 'mesa sto get connectiosn action');
    }
  };
};
