import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import theme from '../styles/theme';

const tabBarOptions: BottomTabNavigationOptions | undefined = {
  tabBarLabelPosition: 'below-icon',
  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 0,
    position: 'absolute',
    backgroundColor: theme.colors.onixDark,
  },
  tabBarItemStyle: {
    marginTop: 19.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

export default tabBarOptions;
