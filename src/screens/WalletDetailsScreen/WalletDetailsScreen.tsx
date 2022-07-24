import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenContainer } from './WalletDetailsScreen.style';
import InputsDetails from './components/InputsDetails';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../redux/user';
import theme from '../../styles/theme';

const WalletDetailsScreen: React.FC = () => {
  const userToken = useSelector(getUserToken);
  console.log('To evale to token', userToken);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView style={{ paddingHorizontal: 32 }}>
        <ScreenContainer>
          <InputsDetails />
        </ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletDetailsScreen;
