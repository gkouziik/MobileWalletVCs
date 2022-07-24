import React from 'react';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import ScreeToTestQRCode from '../screens/ScreenToTestQRCode/ScreeToTestQRCode';
import { BackButton } from './HomeNavigator.style';
import SVG from '../components/Components/SVG/SVG';

const Stack = createNativeStackNavigator();

interface Props {
  initialRouteName?: 'HomeScreen';
}

const mainNavigatorOptions = ({ navigation }: any): NativeStackNavigationOptions => ({
  headerTransparent: true,
  headerBackVisible: false,
  headerShadowVisible: false,
  headerTitle: () => '',
  headerLeft: () => (
    <BackButton onPress={navigation.goBack}>
      <SVG icon="goBack" color={'primary'} width={30} height={30} />
    </BackButton>
  ),
});

const HomeNavigator: React.FC<Props> = ({ initialRouteName = 'HomeScreen' }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      //initialRouteName is for testing purposes only. Default value is WalletS
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={'ScreeToTestQRCode'}
        component={ScreeToTestQRCode}
        options={mainNavigatorOptions}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
