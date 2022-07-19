import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkIfFirstLaunch() {
  try {
    const hasFirstLaunched = await AsyncStorage.getItem('@user_onboarded');
    if (hasFirstLaunched === null) {
      await AsyncStorage.setItem('@user_onboarded', 'true');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);

  React.useEffect(() => {
    checkIfFirstLaunch().then((firstLaunch) => {
      setIsFirstLaunch(firstLaunch);
      setIsFirstLaunchIsLoading(false);
    });
  }, []);

  return {
    isFirstLaunch: isFirstLaunch,
    isLoading: isFirstLaunchIsLoading,
  };
};

export default useGetOnboardingStatus;
