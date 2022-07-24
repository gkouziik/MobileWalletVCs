import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SVG from '../components/Components/SVG/SVG';
import { TabBarLabelText } from './MainTabNavigator.style';
import tabBarOptions from './MainTabNavigatorTabBarOptions';

import HomeNavigator from './HomeNavigator';
import NestedNavigator from './NestedNavigator';
import CredentialsNavigator from './CredentialsNavigator';

const Tab = createBottomTabNavigator();

interface Props {
  initialRouteName?: 'Home' | 'NestedTab | Credentials';
}

const MainTabNavigator: React.FC<Props> = ({ initialRouteName = 'Home' }) => {
  return (
    <Tab.Navigator backBehavior="history" initialRouteName={initialRouteName}>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabelText color={focused ? 'buttonDelete' : 'spaceDark'}>___</TabBarLabelText>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG icon={'wallet'} color={focused ? 'buttonDelete' : 'spaceDark'} />
          ),
          ...tabBarOptions,
        }}
      />

      <Tab.Screen
        name={'NestedTab'}
        component={NestedNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabelText color={focused ? 'buttonDelete' : 'spaceDark'}>___</TabBarLabelText>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG icon={'redeem'} color={focused ? 'buttonDelete' : 'spaceDark'} />
          ),
          ...tabBarOptions,
        }}
      />
      <Tab.Screen
        name={'Credentials'}
        component={CredentialsNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabelText color={focused ? 'buttonDelete' : 'spaceDark'}>___</TabBarLabelText>
          ),
          tabBarIcon: ({ focused }) => (
            <SVG icon={'Notification'} color={focused ? 'buttonDelete' : 'spaceDark'} />
          ),
          ...tabBarOptions,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
