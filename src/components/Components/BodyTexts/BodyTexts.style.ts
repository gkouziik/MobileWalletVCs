import styled, { css } from 'styled-components/native';

import { ColorsType } from '../../../styles/types';
import theme from '../../../styles/theme';

type TextProps = {
  color?: ColorsType;
  bold?: boolean;
  center?: boolean;
};

export const BodyTextRegular = styled.Text<TextProps>`
  ${(props: TextProps) =>
    bodyTextRegular({ color: props.color, bold: props.bold, center: props.center })}
`;

export const bodyTextRegular = ({ color, bold, center }: TextProps) => css`
  font-style: normal;
  font-weight: ${bold ? 'bold' : 'normal'};
  font-size: 14px;
  line-height: ${bold ? '19px' : '21px'};
  letter-spacing: ${bold ? '0' : '-0.32px'};
  color: ${color ? `${theme.colors[color]}` : `${theme.colors.metallicDark}`};
  ${center && `text-align: center;`}
`;
