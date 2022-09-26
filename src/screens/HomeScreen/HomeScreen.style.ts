import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';

import theme from '../../styles/theme';

export const ScreenContainer = styled.View<{ insets: EdgeInsets }>`
  flex: 1;
  background-color: ${theme.colors.onixDeep};
  padding-top: ${({ insets }) => insets.top}px;
`;

export const HomeTitleInfoContainer = styled.View`
  margin-top: 30px;
  align-items: flex-start;
  padding-horizontal: 25px;
`;

export const QRCodeWrapper = styled.View`
  flex: 1;
  flexdirection: 'column';
`;

export const BrandContainer = styled.View`
  padding-top: 54px;
  align-self: center;
  align-items: center;
`;
