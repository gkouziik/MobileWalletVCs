import { simpleAction } from '../utils';
import {
  OPEN_GENERIC_MODAL,
  CLOSE_GENERIC_MODAL,
  GenericModalProperties,
  OpenGenericModalAction,
  CloseGenericModalAction,
} from './types';

/**
 * Open Generic Modal
 */
export const openGenericModalAction = (
  params = {} as GenericModalProperties
): OpenGenericModalAction => simpleAction(OPEN_GENERIC_MODAL, params);

/**
 * Close Generic Modal
 */
export const closeGenericModalAction = (): CloseGenericModalAction =>
  simpleAction(CLOSE_GENERIC_MODAL);
