import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { bodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';

export const InputsWrapper = styled.View`
  margin-top: 70.49px;
  margin-bottom: 16px;
  width: 100%;
`;

export const WalletLabelInput = styled(TextInput)`
  ${bodyTextRegular({ center: true, bold: true })};
  height: 48px;
  margin-bottom: 10px;
`;
