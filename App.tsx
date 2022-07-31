import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import theme from './src/styles/theme';
import useGetOnboardingStatus from './src/hooks/useGetOnBoardingStatus';
import MainNavigator from './src/navigators/MainNavigator';
import GenericModal from './src/components/Components/Modals/GenericModal';
import { closeGenericModalAction, getGenericModal } from './src/redux/genericModal';

const toastConfig: ToastConfig = {
  /*
    Overwrite 'info' type,
    by modifying the existing `BaseToast` component
  */
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: theme.colors.spaceDark,
        borderLeftColor: theme.colors.buttonAltered,
      }}
      text1Style={{ fontSize: 15, color: theme.colors.white }}
      text2Style={{ fontSize: 13, color: theme.colors.white }}
    />
  ),
};

const App = () => {
  const { isFirstLaunch, isLoading } = useGetOnboardingStatus();
  const modal = useSelector(getGenericModal, shallowEqual);

  const dispatch = useDispatch();

  /**
   * Check if the modal is open when the user loads the app.
   * If its open we need to close it.
   * This is not a case where the app its open from background
   */
  React.useEffect(() => {
    if (modal) {
      dispatch(closeGenericModalAction());
    }
  }, [dispatch]);
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.onixDeep }}>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator isFirstLaunching={isFirstLaunch} />
          <Toast config={toastConfig} />
          <GenericModal />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
