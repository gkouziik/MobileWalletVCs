import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  DefaultTheme,
  NavigationContainer,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import theme from '../styles/theme';
import { getUserToken } from '../redux/user/selectors';
import WalletDetailsScreen from '../screens/WalletDetailsScreen/WalletDetailsScreen';
import MainTabNavigator from './MainTabNavigator';
import ScreeToTestQRCode from '../screens/ScreenToTestQRCode/ScreeToTestQRCode';
import { BackButton } from './HomeNavigator.style';
import SVG from '../components/Components/SVG/SVG';
import StoredCredentialsDetailsScreen from '../screens/Details/StoredCredentialsDetailsScreen';
import ConnectionDetailsScreen from '../screens/Details/ConnectionDetailsScreen';

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

const MainNavigator: React.FC<{ isFirstLaunching: boolean }> = ({ isFirstLaunching }) => {
  const Stack = createNativeStackNavigator();
  const userToken = useSelector(getUserToken, shallowEqual);
  const navigationTheme: NavigationTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: theme.colors.onixShade },
  };

  return (
    <NavigationContainer independent={true} theme={navigationTheme}>
      <Stack.Navigator>
        {!userToken ? (
          <Stack.Screen
            name={'WalletDetailsScreen'}
            component={WalletDetailsScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="mainTabNavigator"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={'ScreeToTestQRCode'}
              component={ScreeToTestQRCode}
              options={mainNavigatorOptions}
            />
            <Stack.Screen
              name={'StoredCredentialsDetails'}
              component={StoredCredentialsDetailsScreen}
              options={mainNavigatorOptions}
            />
            <Stack.Screen
              name={'ConnectionDetails'}
              component={ConnectionDetailsScreen}
              options={mainNavigatorOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
