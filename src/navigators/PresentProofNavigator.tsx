import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { BackButton } from './HomeNavigator.style';
import SVG from '../components/Components/SVG/SVG';
import ProofPendingCredentials from '../screens/ProofCredentials/ProofPendingCredentials';

const Stack = createNativeStackNavigator();

interface Props {
  initialRouteName?: 'PresentProofScreen';
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

const PresentProofNavigator: React.FC<Props> = ({ initialRouteName = 'PresentProofScreen' }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="PresentProofScreen"
        component={ProofPendingCredentials}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PresentProofNavigator;
