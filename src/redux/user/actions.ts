import { simpleAction, ThunkDispatchType } from '../utils';
import {
  DELETE_USER_TOKEN,
  DeleteUserTokenAction,
  SET_LOADING,
  SET_USER_TOKEN,
  SET_WALLET_PRE_CREATION_DATA,
  SetLoadingAction,
  SetUserTokenAction,
  SetWalletPreCreationDataPayloadType,
} from './types';

import { CreateWalletParamType, CreateWalletResponseType } from '../../providers/user/types';
import userApi from '../../providers/user';
import { setAxiosToken } from '../../providers/axiosInstances';

export const setUserTokenAction = (params: string): SetUserTokenAction =>
  simpleAction(SET_USER_TOKEN, params);

export const deleteUserTokenAction = (): DeleteUserTokenAction => simpleAction(DELETE_USER_TOKEN);

export const setLoadingAction = (params: boolean): SetLoadingAction =>
  simpleAction(SET_LOADING, params);

export const setWalletPreCreationDataAction = (params: SetWalletPreCreationDataPayloadType) =>
  simpleAction(SET_WALLET_PRE_CREATION_DATA, params);

export const setCreateWalletAction = (params: CreateWalletParamType) => {
  return async (dispatch: ThunkDispatchType): Promise<void> => {
    const { onCallback } = params;

    try {
      console.log(params, 'mesa sto action');
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
