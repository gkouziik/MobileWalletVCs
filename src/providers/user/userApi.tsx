import { METHODS, request } from '../axiosInstances';
import { CreateDidKeyParamsType, CreateWalletParamType } from './types';

export default {
  createWalletApi: (params: CreateWalletParamType) =>
    request(METHODS.POST, 'multitenancy/wallet', { params }),
  createDidKey: (params: CreateDidKeyParamsType) =>
    request(METHODS.POST, 'wallet/did/create', { params }),
};
