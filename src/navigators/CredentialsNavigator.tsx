import React from 'react';

import CredentialsScreen from '../screens/Credentials/CredentialsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

interface Props {
  initialRouteName?: 'CredentialsScreen';
}

const CredentialsNavigator: React.FC<Props> = ({ initialRouteName = 'CredentialsScreen' }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      //initialRouteName is for testing purposes only. Default value is WalletS
    >
      <Stack.Screen
        name="HomeScreen"
        component={CredentialsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CredentialsNavigator;
