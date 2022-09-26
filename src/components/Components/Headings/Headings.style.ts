import styled from 'styled-components/native';

import { ColorsType } from '../../../styles/types';
import theme from '../../../styles/theme';

type HeadingsType = {
  color: ColorsType;
};

/* Headings/H1 - Section */
export const H1 = styled.Text<HeadingsType>`
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: -0.32px;
  color: ${(props: HeadingsType) => `${theme.colors[props.color]}`};
`;

/* Headings/H2 - Sections */
export const H2 = styled.Text<HeadingsType>`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: -0.32px;
  color: ${(props: HeadingsType) => `${theme.colors[props.color]}`};
`;

/* Headings/H3 - Subsection */
export const H3 = styled.Text<HeadingsType>`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.32px;
  color: ${(props: HeadingsType) => `${theme.colors[props.color]}`};
`;

/* Headings / H4 - Category */
export const H4 = styled.Text<HeadingsType>`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: ${(props: HeadingsType) => `${theme.colors[props.color]}`};
`;
