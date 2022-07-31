import React from 'react';
import { Image, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandContainer, ScreenContainer } from './WalletDetailsScreen.style';
import InputsDetails from './components/InputsDetails';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../redux/user';
import theme from '../../styles/theme';
import FastImage from 'react-native-fast-image';

const WalletDetailsScreen: React.FC = () => {
  const userToken = useSelector(getUserToken);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView style={{ paddingHorizontal: 32 }}>
        <ScreenContainer>
          <BrandContainer>
            <Image
              source={require('../../assets/images/logo.png')}
              resizeMode={'contain'}
              style={{ width: 350, height: 350 }}
            />
          </BrandContainer>
          <InputsDetails />
        </ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletDetailsScreen;
