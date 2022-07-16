import { simpleAction } from '../utils';
import {
  DELETE_USER_TOKEN,
  DeleteUserTokenAction,
  SET_LOADING,
  SET_USER_TOKEN,
  SetLoadingAction,
  SetUserTokenAction,
} from './types';

export const setUserTokenAction = (params: string): SetUserTokenAction =>
  simpleAction(SET_USER_TOKEN, params);

export const deleteUserTokenAction = (): DeleteUserTokenAction => simpleAction(DELETE_USER_TOKEN);

export const setLoadingAction = (params: boolean): SetLoadingAction =>
  simpleAction(SET_LOADING, params);
