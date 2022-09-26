import React, { Fragment, useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Wallet from '../../../assets/svg/wallet.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Redeem from '../../../assets/svg/redeem.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Notification from '../../../assets/svg/notification.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import goBack from '../../../assets/svg/goBack.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import successModal from '../../../assets/svg/successModal.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PresentProof from '../../../assets/svg/presentProof.svg';

import { ColorsType } from '../../../styles/types';
import theme from '../../../styles/theme';

const svgMap = {
  ['wallet']: Wallet,
  ['redeem']: Redeem,
  ['Notification']: Notification,
  ['goBack']: goBack,
  ['successModal']: successModal,
  ['PresentProof']: PresentProof,
};

export type SVGType = keyof typeof svgMap;
type SVGResolverType = {
  [svgName: string]: JSX.Element;
};

/**
 * Component that renders an SVG resolved by name
 * @param icon | The SVG name
 */
interface Props {
  icon: SVGType;
  width?: number;
  height?: number;
  color?: ColorsType;
  style?: SvgProps['style'];
}

const SVG: React.FC<Props> = ({ icon, style, color, width, height }) => {
  const svgColor = color ? theme.colors[color] : undefined;

  const SVGResolver = useMemo(() => {
    const svgProperties: SvgProps = { color: svgColor };
    // if width&height are undefined we need the svg to get it's original dimensions but if
    // they are added as undefined the icon is not shown, that's why they are added conditionally
    if (width) {
      svgProperties['width'] = width;
    }
    if (style) {
      svgProperties['style'] = style;
    }
    if (height) {
      svgProperties['height'] = height;
    }
    const resolver: SVGResolverType = {};
    for (const [key, value] of Object.entries(svgMap)) {
      const SVG = value as React.FunctionComponent<SvgProps>;
      resolver[key] = <SVG {...svgProperties} />;
    }
    return resolver;
  }, [height, svgColor, style, width]);

  return <Fragment>{SVGResolver[icon]}</Fragment>;
};
export default SVG;
