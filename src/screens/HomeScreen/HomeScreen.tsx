import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { HomeTitleInfoContainer, QRCodeWrapper, ScreenContainer } from './HomeScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import CTGradientButton from '../../components/Components/Buttons/CTGrradientButton';

import { getDidKey, getUserToken, setDidKeyAction } from '../../redux/user';
import { BrandContainer } from '../WalletDetailsScreen/WalletDetailsScreen.style';
import { useAuthentication } from '../../hooks/useAuthentcation';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const didKey = useSelector(getDidKey);
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);
  const { logout } = useAuthentication();
  React.useEffect(() => {
    console.log(userToken, didKey, 'mesa sto use effect gia to did key sto home screen');
    if (!didKey) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setDidKeyAction());
    }
  }, [didKey]);

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}
        >
          <H1 color="spaceShade">Actions</H1>
          <CTGradientButton
            title={'Delete Wallet'}
            size={'medium'}
            linearColors={['candyRed', 'candyOrange']}
            outsetColorShadow="cardinalTealShadow"
            angle={91.85}
            borderRadius={21}
            onPress={logout}
          />
        </View>

        <BodyTextRegular color="spacePure">All your actions right in one place!</BodyTextRegular>
      </HomeTitleInfoContainer>
      <BrandContainer>
        <Image
          source={require('../../assets/images/scanLogo.png')}
          resizeMode={'contain'}
          style={{ width: 350, height: 350 }}
        />
      </BrandContainer>
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

export default HomeScreen;
