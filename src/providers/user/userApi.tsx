import { METHODS, request } from '../axiosInstances';

export default {
  createWalletApi: (params: any) => request(METHODS.POST, '/multitenancy/wallet', { params }),
};
