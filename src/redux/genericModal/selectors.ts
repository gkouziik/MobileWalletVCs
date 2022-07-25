import { RootState } from '../index';
import { GenericModalProperties, GenericModalState } from './index';

export const __REDUX_STATE_KEY__ = 'genericModal';
export const getReduxStateSlice = (state: RootState): GenericModalState =>
  state[__REDUX_STATE_KEY__];

export const getGenericModal = (state: RootState): GenericModalProperties | undefined =>
  getReduxStateSlice(state).genericModal;
