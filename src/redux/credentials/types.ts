export const SET_PENDING_REQUESTS = 'SET_PENDING_REQUESTS';
export const SET_ACCEPTED_LABEL = 'SET_ACCEPTED_LABEL';
export const DELETE_ACCEPTED_LABEL = 'DELETE_ACCEPTED_LABEL';

export interface CredentialsState {
  pendingRequests: undefined | PendingRequest[];
  acceptedRequestsLabels: [] | any;
}

export type PendingRequest = {
  cred_ex_record: {
    trace: boolean;
    cred_ex_id: string; // this is important
    thread_id: string;
    initiator: string;
    connection_id: string;
    role: string;
    cred_offer: {
      '@type': string;
      '@id': string;
      '~thread': {};
      formats: [
        {
          attach_id: string;
          format: string;
        }
      ];
      'offers~attach': [
        {
          '@id': string;
          'mime-type': 'application/json';
          data: {
            base64: string;
          };
        }
      ];
      comment: string;
    };
    updated_at: string | Date;
    auto_offer: boolean;
    auto_remove: boolean;
    state: string; // this is imporant
    auto_issue: boolean;
    created_at: string | Date;
    by_format: {
      cred_offer: {
        ld_proof: {
          credential: {
            '@context': string[];
            type: string[];
            issuer: string;
            issuanceDate: string | Date;
            credentialSubject: {
              id: string;
              degree: {
                type: string;
                name: string;
              };
              college: string;
            };
          };
          options: {
            proofType: string;
          };
        };
      };
    };
  };
  indy: null;
  ld_proof: null;
};

export interface SetPendingRequestsAction {
  type: typeof SET_PENDING_REQUESTS;
  payload: PendingRequest[];
}

export interface DeleteAcceptedLabelAction {
  type: typeof DELETE_ACCEPTED_LABEL;
}

export interface SetAcceptedLabelAction {
  type: typeof SET_ACCEPTED_LABEL;
  payload: any;
}

export interface AcceptRequestParams {
  holder_did: string;
  cred_ex_id: string;
  credential_id: string;
  onCallback: (
    cred_ex_id: string | undefined,
    credential_id: string | undefined,
    error?: Error
  ) => void;
}

export type CredentialsActionTypes =
  | SetPendingRequestsAction
  | SetAcceptedLabelAction
  | DeleteAcceptedLabelAction;
