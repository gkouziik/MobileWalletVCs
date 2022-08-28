import { METHODS, request } from '../axiosInstances';

export type AcceptPendingCredentialRequestParamsType = {
  holder_id: string;
};

export type StoreCredentialType = {
  credential_id?: string;
};

export default {
  acceptPendingCredentialInvitation: (
    cred_ex_id: string,
    params: AcceptPendingCredentialRequestParamsType
  ) => {
    return request(METHODS.POST, `issue-credential-2.0/records/${cred_ex_id}/send-request`, {
      params,
    });
  },
  storeCredential: (cred_ex_id: string | undefined, params: StoreCredentialType) => {
    return request(METHODS.POST, `issue-credential-2.0/records/${cred_ex_id}/store`, {
      params,
    });
  },
  sendProof: (params: any, pres_ex_id: string | undefined) => {
    console.log(params.dif.presentation_definition.input_descriptors, 'TA PARAMS', pres_ex_id);
    return request(METHODS.POST, `present-proof-2.0/records/${pres_ex_id}/send-presentation`, {
      params,
    });
  },
};
