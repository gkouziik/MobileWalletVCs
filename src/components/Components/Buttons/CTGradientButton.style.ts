import styled, { css } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../styles/theme';
import { ColorsType } from '../../../styles/types';
import { SizesType } from './CTGrradientButton';

type StyledLinearGradientType = {
  backgroundColor: ColorsType | undefined;
  size: SizesType;
  textColor: ColorsType;
  borderRadius: number;
};

const titleStyle = () => css`
  color: ${(props: StyledLinearGradientType) => theme.colors[props.textColor]};
  font-weight: 600;
  font-style: normal;
  text-transform: capitalize;
`;

export const CTGradientButtonWidthResolver = (size: SizesType) => {
  switch (size) {
    case 'small':
      return '70px';
    case 'medium':
      return '152px';
    case 'stretch':
      return 'auto';
    case 'stretch-small':
      return 'auto';
    case 'stretchHeight':
      return 'auto';
    case 'notice':
      return '37px';
  }
};

export const CTGradientButtonHeightResolver = (size: SizesType) => {
  switch (size) {
    case 'small':
    case 'stretch-small':
      return '40px';
    case 'medium':
    case 'stretch':
      return '48px';
    case 'stretchHeight':
      return '56px';
    case 'notice':
      return '24px';
  }
};

export const StyledLinearGradient = styled(LinearGradient)<StyledLinearGradientType>`
  border-radius: ${(props: StyledLinearGradientType) => `${props.borderRadius}px`};
  height: ${(props: StyledLinearGradientType) => CTGradientButtonHeightResolver(props.size)};
  width: auto;
  min-width: ${(props: StyledLinearGradientType) => CTGradientButtonWidthResolver(props.size)};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props: StyledLinearGradientType) =>
    props.backgroundColor ? theme.colors[props.backgroundColor] : 'transparent'};
`;

export const ButtonTitle = styled.Text<StyledLinearGradientType>`
  ${() => titleStyle()};
  font-size: 16px;
  line-height: 19px;
  padding-left: 0px;
  padding-top: 0px;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs({
  size: 20,
  color: theme.colors.white,
})`
  margin-horizontal: 10px;
`;
