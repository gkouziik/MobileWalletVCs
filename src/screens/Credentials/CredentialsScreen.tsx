import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import {
  HomeTitleInfoContainer,
  PendingCredentialsContentScrollView,
  ScreenContainer,
} from './CredentialsScreen.style';
import { H1, H2 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { getAcceptedLabelCredentials, getPendingCredentials } from '../../redux/credentials';
import WithLoadingWrapper from '../../components/Wrappers/WithLoadingWrapper';
import { getUserToken } from '../../redux/user';
import { setPendingRequestsAction } from '../../redux/credentials/actions';
import theme from '../../styles/theme';
import NotAvailableCredentials from './components/NotAvailableCredentials';
import CredentialCard from './components/CredentialCard';

const CredentialsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const userToken = useSelector(getUserToken);
  const dispatch = useDispatch();
  const [isLoadingPending, setIsLoadingPending] = useState<boolean>(true);
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  console.log('EDW REEE');
  const [isLoadingCompleted, setIsLoadingCompleted] = useState<boolean>(true);
  const pendingCredentials = useSelector(getPendingCredentials);

  const requestPendingCredentials = React.useCallback((initialLoading = false) => {
    if (initialLoading) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/issue-credential-2.0/records', { headers })
        .then((response) => {
          dispatch(setPendingRequestsAction(response.data.results));
          console.log(response.data, 'to response sta pending credentials');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Oops, Something went wrong!',
            text2: 'Please refresh to try again!',
            position: 'top',
            visibilityTime: 2000,
          });
        })
        .finally(() => {
          setIsLoadingPending(false);
        });
    } else {
      setIsRefreshing(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/issue-credential-2.0/records', { headers })
        .then((response) => {
          dispatch(setPendingRequestsAction(response.data.results));
          console.log(response.data, 'to response sta pending credentials');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Oops, Something went wrong!',
            text2: 'Please refresh to try again!',
            position: 'top',
            visibilityTime: 2000,
          });
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, []);

  React.useEffect(() => {
    requestPendingCredentials(true);
  }, [requestPendingCredentials]);

  return (
    <ScreenContainer insets={insets}>
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Pending Credentials</H1>
        <BodyTextRegular color="spacePure">
          All your credentials right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
      <WithLoadingWrapper isLoading={isLoadingPending}>
        {pendingCredentials && pendingCredentials.length > 0 ? (
          <PendingCredentialsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={requestPendingCredentials}
              />
            }
          >
            {pendingCredentials?.map((credential, index) => (
              <CredentialCard key={index} credential={credential} />
            ))}
          </PendingCredentialsContentScrollView>
        ) : (
          <PendingCredentialsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={requestPendingCredentials}
              />
            }
          >
            <NotAvailableCredentials />
          </PendingCredentialsContentScrollView>
        )}
      </WithLoadingWrapper>
    </ScreenContainer>
  );
};

export default CredentialsScreen;
