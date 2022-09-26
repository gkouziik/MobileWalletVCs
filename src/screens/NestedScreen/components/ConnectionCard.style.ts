import styled from 'styled-components/native';

import theme from '../../../styles/theme';
import { H2 } from '../../../components/Components/Headings/Headings.style';

export const ConnectionCardContainerTouchable = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 20px;
  width: auto;
  height: 100px;
  opacity: 0.8;
  border-radius: 20px;
  border-color: ${theme.colors.candyRed};
  background-color: ${theme.colors.metallicPearlWhite};
`;

export const StyledTitle = styled(H2)`
  color: ${theme.colors.secondary};
`;
