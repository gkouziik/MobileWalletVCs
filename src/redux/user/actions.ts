import { simpleAction, ThunkDispatchType } from '../utils';
import {
  DELETE_DID_KEY,
  DELETE_USER_TOKEN,
  DeleteDidKeyAction,
  DeleteUserTokenAction,
  SET_DID_KEY,
  SET_LOADING,
  SET_USER_TOKEN,
  SET_WALLET_PRE_CREATION_DATA,
  SetDidKeyAction,
  SetLoadingAction,
  SetUserTokenAction,
  SetWalletPreCreationDataPayloadType,
} from './types';

import {
  CreateDidKeyParamsType,
  CreateDidKeyResponseType,
  CreateWalletParamType,
  CreateWalletResponseType,
} from '../../providers/user/types';
import userApi from '../../providers/user';
import { setAxiosToken } from '../../providers/axiosInstances';

export const setUserTokenAction = (params: string): SetUserTokenAction =>
  simpleAction(SET_USER_TOKEN, params);

export const setDidKeyToReduxAction = (params: string): SetDidKeyAction =>
  simpleAction(SET_DID_KEY, params);

export const deleteUserTokenAction = (): DeleteUserTokenAction => simpleAction(DELETE_USER_TOKEN);

export const deleteDidKeyAction = (): DeleteDidKeyAction => simpleAction(DELETE_DID_KEY);

export const setLoadingAction = (params: boolean): SetLoadingAction =>
  simpleAction(SET_LOADING, params);

export const setWalletPreCreationDataAction = (params: SetWalletPreCreationDataPayloadType) =>
  simpleAction(SET_WALLET_PRE_CREATION_DATA, params);

export const setCreateWalletAction = (params: CreateWalletParamType) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    const { onCallback } = params;

    try {
      const { request: createWallet } = userApi.single.createWalletApi(params);
      const response: CreateWalletResponseType = await createWallet();
      dispatch(setUserTokenAction(response.token));
      setAxiosToken(response.token);
      onCallback(response.token);
    } catch (error) {
      onCallback(undefined, error as Error);
    }
  };
};

export const setDidKeyAction = () => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    try {
      const params: CreateDidKeyParamsType = {
        method: 'key',
        options: {
          key_type: 'bls12381g2',
        },
      };
      const { request: createDid } = userApi.single.createDidKey(params);
      const response: CreateDidKeyResponseType = await createDid();
      console.log(response.result.did, 'to response tou create did key');
      dispatch(setDidKeyToReduxAction(response.result.did));
    } catch (error) {
      console.log('to error mesa sto create did key post request', error);
    }
  };
};
