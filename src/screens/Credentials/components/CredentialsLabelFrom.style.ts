import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { H3 } from '../../../components/Components/Headings/Headings.style';
import { bodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';

export const CredentialsLabelTitle = styled(H3)`
  margin-bottom: 8px;
  padding-top: 20px;
`;

export const CredentialStyledInput = styled(TextInput)`
  ${bodyTextRegular({ center: true, bold: true })};
  height: 48px;
  width: 250px;
  margin-bottom: 10px;
`;
