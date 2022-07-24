import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { HomeTitleInfoContainer, ScreenContainer } from './NestedScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';

const NestedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Connections</H1>
        <BodyTextRegular color="spacePure">
          All your connections right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
    </ScreenContainer>
  );
};

export default NestedScreen;
