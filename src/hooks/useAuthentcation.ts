import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { setAxiosToken } from '../../src/providers/axiosInstances';
import { deleteUserTokenAction, getUserToken, setUserTokenAction } from '../redux/user';

type UserAuthType = {
  login: (jwtToken?: string) => void;
  iat: string;
  logout: () => void;
  wallet_id: string;
};

export const useAuthentication = (): UserAuthType => {
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken, shallowEqual);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { iat, wallet_id } = userToken && jwt_decode(userToken);

  const login = async (jwtToken?: string) => {
    console.log(jwtToken, 'mesa sto login');
    if (jwtToken) {
      dispatch(setUserTokenAction(jwtToken));
      setAxiosToken(jwtToken);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch(deleteUserTokenAction());
    setAxiosToken('');
  };

  return {
    login,
    logout,
    iat,
    wallet_id,
  };
};
