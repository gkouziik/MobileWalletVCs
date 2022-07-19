import React from 'react';

import theme from '../../styles/theme';
import { StyledActivityIndicator } from './WithLoadingWrapper.style';

interface WithLoadingWrapperProps {
  children: JSX.Element;
  isLoading: boolean;
}

/**
 * Wrapper that renders an activity indicator or
 * children elements depending the value of isLoading
 * property that is passed from the component
 * @param children | The children to be rendered
 * @param Loading param | Boolean
 */
const WithLoadingWrapper = ({ children, isLoading }: WithLoadingWrapperProps) => {
  return isLoading ? (
    <StyledActivityIndicator size={60} color={theme.colors.shadowPurple} />
  ) : (
    <>{children}</>
  );
};
export default WithLoadingWrapper;
