import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getUserToken } from '../../redux/user';
import {
  HomeTitleInfoContainer,
  PendingProofCredentialsContentScrollView,
  ScreenContainer,
} from './ProofPendingCredentials.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { RefreshControl, StatusBar, View } from 'react-native';
import WithLoadingWrapper from '../../components/Wrappers/WithLoadingWrapper';
import NotAvailableProofRequests from './components/NotAvaialbleProofRequests';
import theme from '../../styles/theme';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ProofPendingCredentials: React.FC = () => {
  const insets = useSafeAreaInsets();
  const userToken = useSelector(getUserToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const [proofRequests, setProofRequests] = useState<any>([]);

  const presentProofRequest = React.useCallback((initialLoading = false) => {
    console.log('MPAINEI EDW?????');
    if (initialLoading) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/present-proof-2.0/records', { headers })
        .then((response) => {
          setProofRequests(response.data?.results);
          console.log(response.data, 'RESPONSE');
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Oops, Something went wrong!',
            text2: 'Please refresh to try again!',
            position: 'top',
            visibilityTime: 2000,
          });
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsRefreshing(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/present-proof-2.0/records', { headers })
        .then((response) => {
          console.log(response.data, 'RESPONSE');
          setProofRequests(response.data?.results);
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Oops, Something went wrong!',
            text2: 'Please refresh to try again!',
            position: 'top',
            visibilityTime: 2000,
          });
          console.log(error);
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, []);

  React.useEffect(() => {
    presentProofRequest(true);
  }, [presentProofRequest]);

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Proof Requests</H1>
        <BodyTextRegular color="spacePure">
          All your present proof history in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
      <WithLoadingWrapper isLoading={isLoading}>
        {proofRequests && proofRequests.length > 0 ? (
          <PendingProofCredentialsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={presentProofRequest}
              />
            }
          >
            {proofRequests?.map((proofRequest: any, index: React.Key | null | undefined) => (
              <View key={index}></View>
            ))}
          </PendingProofCredentialsContentScrollView>
        ) : (
          <PendingProofCredentialsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={presentProofRequest}
              />
            }
          >
            <NotAvailableProofRequests />
          </PendingProofCredentialsContentScrollView>
        )}
      </WithLoadingWrapper>
    </ScreenContainer>
  );
};

export default ProofPendingCredentials;
