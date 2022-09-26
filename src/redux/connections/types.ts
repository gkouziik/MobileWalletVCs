export const SET_CONNECTIONS = 'SET_CONNECTIONS';

export interface ConnectionsState {
  connections: undefined | Connection[];
}

export type Connection = {
  accept: string;
  connection_id: string;
  connection_protocol: string;
  created_at: string | Date;
  invitation_key: string;
  invitation_mode: string;
  invitation_msg_id: string;
  my_did: string;
  request_id: string;
  rfc23_state: string;
  routing_state: string;
  state: string;
  their_did: string;
  their_label: string;
  their_role: string;
  updated_at: string;
};

export interface SetConnectionsAction {
  type: typeof SET_CONNECTIONS;
  payload: Connection[];
}

export type ConnectionActionTypes = SetConnectionsAction;

// const something = {
//   results: [
//     {
//       accept: 'manual',
//       connection_id: 'f664484b-75b4-4db7-bfbc-ab50a2eb68fd',
//       connection_protocol: 'connections/1.0',
//       created_at: '2022-07-31T19:22:32.882644Z',
//       invitation_key: '13puWY8Qaq7PJ5jUd3sEp1Wz4eMhLitNMALe2Gif9ebJ',
//       invitation_mode: 'once',
//       invitation_msg_id: '0dd60f3b-f096-4137-beef-bc119f9d9326',
//       my_did: 'LG9bNm7A4yup4ebReCJFEb',
//       request_id: 'e3c578c7-98a5-479e-b1a4-d0fa3de59b59',
//       rfc23_state: 'completed',
//       routing_state: 'none',
//       state: 'active',
//       their_did: 'GvjAoosK4TyDT461ryLWZS',
//       their_label: 'alpha-corp',
//       their_role: 'inviter',
//       updated_at: '2022-07-31T19:22:38.589377Z',
//     },
//   ],
// };
