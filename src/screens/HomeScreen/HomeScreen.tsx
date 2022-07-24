import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeTitleInfoContainer, QRCodeWrapper, ScreenContainer } from './HomeScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import CTGradientButton from '../../components/Components/Buttons/CTGrradientButton';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Actions</H1>
        <BodyTextRegular color="spacePure">All your actions right in one place!</BodyTextRegular>
      </HomeTitleInfoContainer>
      <QRCodeWrapper>
        <CTGradientButton
          size="medium"
          linearColors={['cardinalTeal', 'cardinalPurple']}
          angle={91.85}
          borderRadius={21}
          onPress={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            navigation.navigate('ScreeToTestQRCode');
          }}
          outsetColorShadow="cardinalTealShadow"
          title="Scan Code"
          textColor="spacePure"
          style={{ alignSelf: 'center', position: 'absolute', bottom: 120 }}
        />
      </QRCodeWrapper>
    </ScreenContainer>
  );
};

/**
 *  <CTGradientButton
 *                 size="stretchHeight"
 *                 linearColors={['cardinalTeal', 'cardinalPurple']}
 *                 angle={91.85}
 *                 borderRadius={21}
 *                 onPress={handleActions}
 *                 icon="withdraw"
 *                 iconDirection="column"
 *                 outsetColorShadow="cardinalTealShadow"
 *                 title={'wallet:withdraw'}
 *                 textColor="spacePure"
 *                 style={{ flex: 1, paddingRight: 6 }}
 *               />
 */

export default HomeScreen;
