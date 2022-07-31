import styled, { css } from 'styled-components/native';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

import theme from '../../../styles/theme';
import { ColorsType } from '../../../styles/types';
import { ModesType, SizesType } from './CTButton';

type StyledButtonType = {
  size: SizesType;
  backgroundColor: ColorsType;
  mode: ModesType;
  borderRadius: number;
  colour: ColorsType;
};

/**
 * Function that returns a styled object for the contentStyle property of react native paper button
 * depending on the button mode ("contained" or "outlined")
 * @param mode | type of button "contained" or "outlined"
 * @param backgroundColor | the background color of the content of the button
 * @param size | The size of the button {@see SizesType}
 * @param iconOnly | If the button has only icon as its content and no text (boolean)
 */
export const contentStyleResolver = (
  mode: ModesType,
  backgroundColor: ColorsType,
  size: SizesType,
  iconOnly: boolean,
  borderRadius: number
): StyleProp<ViewStyle> => {
  switch (mode) {
    case 'outlined':
      return {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: theme.colors[backgroundColor],
        height: CTButtonSizeHeightResolver(size),
        width: 'auto',
        minWidth: CTButtonSizeWidthResolver(size),
        borderRadius: borderRadius,
        paddingRight: iconOnly ? 15 : 0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      };
    case 'contained':
      return {
        height: CTButtonSizeHeightResolver(size),
        width: 'auto',
        minWidth: CTButtonSizeWidthResolver(size),
        paddingRight: iconOnly ? 15 : 0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      };
  }
};

/**
 * function that returns the appropriate height of the content of the styled ct button depending
 * on its size
 * @param size | The size of the button {@see SizesType}
 */
const CTButtonSizeHeightResolver = (size: SizesType) => {
  switch (size) {
    case 'small':
    case 'stretch-small':
      return 40;
    case 'medium':
    case 'stretch':
      return 48;
  }
};

/**
 * function that returns the appropriate width of the content of the styled ct button depending
 * on its size
 * @param size | The size of the button {@see SizesType}
 */
const CTButtonSizeWidthResolver = (size: SizesType) => {
  switch (size) {
    case 'small':
      return 70;
    case 'medium':
      return 152;

    case 'stretch':
      return 'auto';
    case 'stretch-small':
      return 'auto';
  }
};

const ButtonStyleModeResolver = (props: StyledButtonType) => {
  switch (props.mode) {
    case 'contained':
      return css`
        background: ${(props: StyledButtonType) => theme.colors[props.backgroundColor]};
        color: ${(props: StyledButtonType) => theme.colors[props.colour]};
        border-radius: ${(props: StyledButtonType) => `${props.borderRadius}px`};
      `;
    default:
      return '';
  }
};

export const StyledButton = styled(Button)<StyledButtonType>`
  ${(props: StyledButtonType) => ButtonStyleModeResolver(props)}
`;
