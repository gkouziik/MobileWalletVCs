import {
  CLOSE_GENERIC_MODAL,
  GenericModalActionTypes,
  GenericModalState,
  OPEN_GENERIC_MODAL,
} from './types';

const genericModal = (
  state: GenericModalState = {},
  action: GenericModalActionTypes
): GenericModalState => {
  switch (action.type) {
    case OPEN_GENERIC_MODAL:
      return {
        ...state,
        genericModal: action.payload,
      };
    case CLOSE_GENERIC_MODAL:
      return {
        ...state,
        genericModal: undefined,
      };
    default:
      return state;
  }
};

export default genericModal;
