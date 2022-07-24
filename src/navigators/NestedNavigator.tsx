import React from 'react';

import NestedScreen from '../screens/NestedScreen/NestedScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

interface Props {
  initialRouteName?: 'NestedScreen';
}

const HomeNavigator: React.FC<Props> = ({ initialRouteName = 'NestedScreen' }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      //initialRouteName is for testing purposes only. Default value is WalletS
    >
      <Stack.Screen name="HomeScreen" component={NestedScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
