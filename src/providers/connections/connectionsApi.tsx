import { METHODS, request } from '../axiosInstances';
import { ReceiveInvitationParamsType } from './types';

export default {
  receiveInvitation: (params: ReceiveInvitationParamsType) =>
    request(METHODS.POST, 'connections/receive-invitation', { params }),
  acceptInvitation: (connection_id: string) =>
    request(METHODS.POST, `connections/${connection_id}/accept-invitation`, {}),
  getConnections: () => request(METHODS.GET, 'connections', {}),
};
