import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';

import { HomeTitleInfoContainer, ScreenContainer } from './CredentialsScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';

const CredentialsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean>(true); // initial is loading local state

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Credentials</H1>
        <BodyTextRegular color="spacePure">
          All your credentials right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
    </ScreenContainer>
  );
};

export default CredentialsScreen;
