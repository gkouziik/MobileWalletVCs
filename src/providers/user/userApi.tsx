import { METHODS, request } from '../axiosInstances';
import { CreateWalletParamType } from './types';

export default {
  createWalletApi: (params: CreateWalletParamType) =>
    request(METHODS.POST, 'multitenancy/wallet', { params }),
};
