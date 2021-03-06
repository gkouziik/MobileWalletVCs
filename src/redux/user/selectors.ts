import { UserState } from 'src/redux/user/types';
import { RootState } from 'src/redux';

export const __REDUX_STATE_KEY__ = 'user';
export const getReduxStateSlice = (state: RootState): UserState => state[__REDUX_STATE_KEY__];

export const getIsLoading = (state: RootState): boolean => getReduxStateSlice(state).isLoading;
export const getUserToken = (state: RootState): string => getReduxStateSlice(state).userToken;
