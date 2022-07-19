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

// /**
//  * function that returns the options object for the following screens
//  * {@see Terms} {@see Policy}
//  * @param navigation | The navigation object
//  */
// const mainNavigatorOptions = ({ navigation }: any): NativeStackNavigationOptions => ({
//     headerTransparent: true,
//     headerBackVisible: false,
//     headerTitleAlign: 'center',
//     headerShadowVisible: false,
//     headerTitle: () => <LogoWithTitle source={assets.logo} resizeMode="contain" />,
//     headerLeft: () => (
//         <BackButton onPress={navigation.goBack}>
//             <SVG icon="goBack" color={'white'} width={30} height={30} />
//         </BackButton>
//     ),
// });

const MainNavigator: React.FC<{ isFirstLaunching: boolean }> = ({ isFirstLaunching }) => {
  const Stack = createNativeStackNavigator();
  const userToken = useSelector(getUserToken, shallowEqual);

  const navigationTheme: NavigationTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: theme.colors.white },
  };

  return (
    <NavigationContainer independent={true} theme={navigationTheme}>
      <Stack.Navigator>
        {isFirstLaunching ? (
          <Stack.Screen
            name="WalletDetailsScreen"
            component={WalletDetailsScreen}
            options={{ headerShown: false }}
          />
        ) : !userToken ? (
          <Stack.Screen
            name="WalletDetailsScreen"
            component={WalletDetailsScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="WalletDetailsScreen"
            component={WalletDetailsScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
