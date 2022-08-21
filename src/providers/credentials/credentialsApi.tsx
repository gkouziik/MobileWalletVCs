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
};
