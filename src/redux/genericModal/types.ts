import { StyleProp, ViewStyle } from 'react-native';
import { ColorsType } from '../../styles/types';

export const OPEN_GENERIC_MODAL = 'OPEN_GENERIC_MODAL';
export const CLOSE_GENERIC_MODAL = 'CLOSE_GENERIC_MODAL';

export interface GenericModalState {
  genericModal?: GenericModalProperties;
}

export type GenericModalSizes = 'small' | 'medium' | 'large';

export type GenericModalStatuses = 'success' | 'warning' | 'error';

export interface GenericModalProperties {
  isLoading?: boolean;
  icon?: string;
  title?: string;
  isNotice?: boolean;
  blurView?: boolean;
  description?: string;
  primaryLabel?: string;
  isTransparent?: boolean;
  secondaryLabel?: string;
  bottomLinkLabel?: string;
  primaryOnPress?: () => void;
  formComponent?: JSX.Element;
  status?: GenericModalStatuses;
  secondaryOnPress?: () => void;
  descriptionColor?: ColorsType;
  outsetColorShadow?: ColorsType;
  color?: 'candyYellow' | 'candyRed';
  gradientContainerStyle?: StyleProp<ViewStyle>;
}

export interface OpenGenericModalAction {
  type: typeof OPEN_GENERIC_MODAL;
  payload: GenericModalProperties;
}

export interface CloseGenericModalAction {
  type: typeof CLOSE_GENERIC_MODAL;
}

export type GenericModalActionTypes = OpenGenericModalAction | CloseGenericModalAction;
