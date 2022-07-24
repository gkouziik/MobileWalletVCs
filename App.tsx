import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';

import theme from './src/styles/theme';
import useGetOnboardingStatus from './src/hooks/useGetOnBoardingStatus';
import WithLoadingWrapper from './src/components/Wrappers/WithLoadingWrapper';
import MainNavigator from './src/navigators/MainNavigator';

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
  console.log(isFirstLaunch, isLoading, 'edw');
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.onixDeep }}>
      <PaperProvider>
        <Toast config={toastConfig} />
        <WithLoadingWrapper isLoading={isLoading}>
          <MainNavigator isFirstLaunching={isFirstLaunch} />
        </WithLoadingWrapper>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
