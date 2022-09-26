import { UserState } from '../user/types';
import { RootState } from '../../redux';

export const __REDUX_STATE_KEY__ = 'user';
export const getReduxStateSlice = (state: RootState): UserState => state[__REDUX_STATE_KEY__];

export const getIsLoading = (state: RootState): boolean => getReduxStateSlice(state).isLoading;
export const getUserToken = (state: RootState): string => getReduxStateSlice(state).userToken;
export const getUserWalletLabel = (state: RootState): string =>
  getReduxStateSlice(state).walletLabel;
export const getUserWalletRetrievePassword = (state: RootState): string =>
  getReduxStateSlice(state).walletRetrievePassword;
export const getDidKey = (state: RootState): string | undefined => getReduxStateSlice(state).didKey;
