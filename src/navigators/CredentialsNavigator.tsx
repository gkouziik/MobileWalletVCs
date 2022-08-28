import React from 'react';

import CredentialsScreen from '../screens/Credentials/CredentialsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import theme from '../../src/styles/theme';
import AcceptedCredentialsScreen from '../screens/Credentials/AcceptedCredentialsScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

interface Props {
  initialRouteName?: 'CredentialsScreen';
}

const CredentialsNavigator: React.FC<Props> = ({ initialRouteName = 'CredentialsScreen' }) => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      style={{ marginTop: 50 }}
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.grey,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarStyle: { backgroundColor: theme.colors.onixDeep },
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
      }}
      //initialRouteName is for testing purposes only. Default value is WalletS
    >
      <Tab.Screen name="Pending" component={CredentialsScreen} />
      <Tab.Screen name="Stored" component={AcceptedCredentialsScreen} />
    </Tab.Navigator>
  );
};

export default CredentialsNavigator;
