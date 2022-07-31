import styled from 'styled-components/native';
import CTGradientButton from '../Buttons/CTGrradientButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { H2, H4 } from '../Headings/Headings.style';
import CTButton from '../Buttons/CTButton';

export const Container = styled(KeyboardAwareScrollView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  height: 100%;
`;

export const Title = styled(H2)`
  width: 260px;
  margin: 20px 0px;
  text-align: center;
`;

export const Icon = styled(H4)`
  font-size: 50px;
  line-height: 60px;
`;

export const MessageWrapper = styled.View`
  width: 205px;
  margin-bottom: 40px;
`;

export const FormValidationWrapper = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

export const ButtonsWrapper = styled.View<{ justify?: 'space-between' | 'center' }>`
  width: 100%;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify};
`;

export const PrimaryButton = styled(CTGradientButton)`
  flex-grow: 1;
`;

export const SecondaryButton = styled(CTButton)`
  flex-grow: 1;
  margin-right: 20px;
  border-radius: 21px;
`;
