import { simpleAction, ThunkDispatchType } from '../../redux/utils';
import {
  AcceptRequestParams,
  DELETE_ACCEPTED_LABEL,
  DeleteAcceptedLabelAction,
  PendingRequest,
  SET_ACCEPTED_LABEL,
  SET_PENDING_REQUESTS,
  SetAcceptedLabelAction,
  SetPendingRequestsAction,
} from '../credentials';
import credentialsApi from '../../providers/credentials';
import {
  AcceptPendingCredentialRequestParamsType,
  StoreCredentialType,
} from '../../providers/credentials/credentialsApi';

export const setPendingRequestsAction = (params: PendingRequest[]): SetPendingRequestsAction =>
  simpleAction(SET_PENDING_REQUESTS, params);

export const setAcceptedLabelAction = (params: any): SetAcceptedLabelAction =>
  simpleAction(SET_ACCEPTED_LABEL, params);

export const deleteAcceptedLabelAction = (): DeleteAcceptedLabelAction =>
  simpleAction(DELETE_ACCEPTED_LABEL);

export const acceptPendingCredentialRequestAction = (params: AcceptRequestParams) => {
  const { onCallback, credential_id, cred_ex_id, holder_did } = params;
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const requestParams: AcceptPendingCredentialRequestParamsType = {
        holder_id: holder_did,
      };
      const { request: acceptInvitationRequest } =
        credentialsApi.single.acceptPendingCredentialInvitation(cred_ex_id, { ...requestParams });
      console.log('mesa sto request', requestParams, acceptInvitationRequest);
      const response = await acceptInvitationRequest();
      console.log(response, 'TO RESPONSE APO TO PRWTO ACCEPT REQUEST');
      onCallback(cred_ex_id, credential_id, undefined);
    } catch (error) {
      console.log(error, 'TO ERROR APO TO PRWTO ACCEPT REQUEST');
      onCallback(undefined, undefined, error as Error);
    }
  };
};

export const storeAcceptedCredentialRequest = (cred_ex_id?: string, credential_id?: string) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const params: StoreCredentialType = {
        credential_id: credential_id?.toString(),
      };
      const { request: storeRequest } = credentialsApi.single.storeCredential(cred_ex_id, {
        ...params,
      });

      const responseStore = await storeRequest();
      if (credential_id) {
        console.log(credential_id, 'TO LABEL');
        dispatch(setAcceptedLabelAction(credential_id?.toString()));
      }
    } catch (error) {
      console.log(error, 'TO ERROR APO TO STORE REQUEST');
      // TODO vale callback function gia to store
    }
  };
};

export const sendPresentProofAction = (
  params: any,
  pres_ex_id: string,
  onCallback: (error?: Error) => void
) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const { request: sendProofRequest } = credentialsApi.single.sendProof(
        { ...params },
        pres_ex_id
      );
      const response = await sendProofRequest();
      console.log(response, 'TO RESPONSE APO TO SEND PROOF');
      onCallback();
    } catch (error) {
      onCallback(error as Error);
    }
  };
};
