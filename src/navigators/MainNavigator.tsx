import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  DefaultTheme,
  NavigationContainer,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import theme from '../styles/theme';
import { getUserToken } from '../redux/user/selectors';
import WalletDetailsScreen from '../screens/WalletDetailsScreen/WalletDetailsScreen';
import MainTabNavigator from './MainTabNavigator';

const MainNavigator: React.FC<{ isFirstLaunching: boolean }> = ({ isFirstLaunching }) => {
  const Stack = createNativeStackNavigator();
  const userToken = useSelector(getUserToken, shallowEqual);
  console.log(isFirstLaunching && !userToken, 'synthiki', userToken, isFirstLaunching);
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
          <Stack.Screen
            name="mainTabNavigator"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
