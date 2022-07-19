import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenContainer } from './WalletDetailsScreen.style';
import InputsDetails from './components/InputsDetails';

const WalletDetailsScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
