import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import theme from '../../../styles/theme';
import { ColorsType } from '../../../styles/types';

import { StyledLinearGradient, ButtonTitle, ActivityIndicator } from './CTGradientButton.style';

export type Positions = {
  x: number;
  y: number;
};

export type SizesType =
  | 'small'
  | 'medium'
  | 'stretch'
  | 'notice'
  | 'stretch-small'
  | 'stretchHeight';

interface Props {
  title?: string;
  angle?: number;
  size: SizesType;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  locations?: number[];
  borderRadius?: number;
  textColor?: ColorsType;
  linearColors: ColorsType[];
  accessibilityLabel?: string; // Accessibility label for the button. This is read by the screen reader when the user taps the button.
  backgroundColor?: ColorsType;
  style?: StyleProp<ViewStyle>;
  linearEndPositions?: Positions;
  outsetColorShadow?: ColorsType;
  linearStartPositions?: Positions;
  titleStyle?: StyleProp<TextStyle>;
  gradientContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * Component that renders a button with linear gradient according to arguments
 * This button only supports "contained" mode buttons
 */
const CTGradientButton: React.FC<Props> = ({
  size,
  angle,
  title,
  style,
  isLoading,
  locations,
  titleStyle,
  linearColors,
  backgroundColor,
  disabled = false,
  borderRadius = 10,
  outsetColorShadow,
  textColor = 'white',
  gradientContainerStyle,
  linearEndPositions = undefined,
  linearStartPositions = undefined,
  ...rest
}) => {
  return (
    <TouchableOpacity disabled={disabled} {...rest} activeOpacity={0.9} style={style}>
      <StyledLinearGradient
        backgroundColor={backgroundColor}
        colors={linearColors.map((color) => theme.colors[color])}
        locations={locations ? locations : undefined}
        useAngle={!!angle}
        angle={angle ? angle : undefined}
        start={linearStartPositions}
        end={linearEndPositions}
        size={size}
        borderRadius={borderRadius}
        textColor={textColor}
        style={[
          gradientContainerStyle,
          outsetColorShadow && {
            shadowOffset: { width: 0, height: -2 },
            shadowRadius: 9,
            shadowColor: theme.colors[outsetColorShadow],
            shadowOpacity: 0.5,
            elevation: 6,
          },
        ]}
      >
        {isLoading && <ActivityIndicator />}
        {isLoading ? null : (
          <ButtonTitle
            size={size}
            style={titleStyle}
            textColor={textColor}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
          >
            {title ? title : null}
          </ButtonTitle>
        )}
      </StyledLinearGradient>
    </TouchableOpacity>
  );
};

export default CTGradientButton;
