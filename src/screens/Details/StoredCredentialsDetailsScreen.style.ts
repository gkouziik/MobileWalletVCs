import styled from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';

import theme from '../../styles/theme';
import { ColorsType } from '../../styles/types';

type DividerProps = {
  isFocused?: boolean;
  color?: ColorsType;
};

export const ScreenContainer = styled.View<{ insets: EdgeInsets }>`
  flex: 1;
  background-color: ${theme.colors.onixDeep};
  margin-top: 10px;
  padding-top: ${({ insets }) => insets.top}px;
`;

export const HomeTitleInfoContainer = styled.View`
  margin-top: 30px;
  align-items: flex-start;
  padding-horizontal: 25px;
`;

export const Divider = styled.View<DividerProps>`
  height: 0px;
  margin: 24px 10px 30px 5px;
  border: 1px solid;
  border-color: ${(props: DividerProps) =>
    props.color ? theme.colors[props.color] : theme.colors.irisDark};
  opacity: ${(props: DividerProps) => (props.isFocused ? 0.7 : 0.1)};
`;
