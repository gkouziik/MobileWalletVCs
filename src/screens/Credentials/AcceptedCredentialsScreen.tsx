import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl, View, Text } from 'react-native';
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

const AcceptedCredentialsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const acceptedLabelCredentials = useSelector(getAcceptedLabelCredentials);
  const userToken = useSelector(getUserToken);
  console.log(userToken);
  const dispatch = useDispatch();
  const [isLoadingPending, setIsLoadingPending] = useState<boolean>(true);
  const [refreshing, setIsRefreshing] = useState<boolean>(false);

  console.log(acceptedLabelCredentials, 'GIANNIS');
  const [isLoadingCompleted, setIsLoadingCompleted] = useState<boolean>(true);
  const pendingCredentials = useSelector(getPendingCredentials);

  let acceptedLabels: void | any[] = [];

  const requestPendingCredentials = React.useCallback((initialLoading = false) => {
    if (initialLoading) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const mapLoop = async () => {
        console.log('Start');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const promises = acceptedLabelCredentials
          .filter((acceptedLabel: any) => {
            if (Object.keys(acceptedLabel).length !== 0) {
              return true;
            }
            return false;
          })
          .map(async (acceptedLabelCredential: any) => {
            const acceptedLabel = new Promise((resolve, reject) => {
              setTimeout(
                () =>
                  resolve(
                    axios.get(
                      `https://api.mt.vsk.gr/credential/w3c/${acceptedLabelCredential?.acceptedLabel}`,
                      {
                        headers,
                      }
                    )
                  ),
                1000
              );
            });
            return acceptedLabel;
          });
        acceptedLabels = await Promise.all(promises)
          .catch((error) => {
            console.log(error, 'TO ERROR');
          })
          .finally(() => {
            setIsLoadingPending(false);
          });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(acceptedLabels[0].data, 'TA ACCEPTED LABELS RESPONSE');

        console.log('End');
      };
      mapLoop();
    } else {
      setIsRefreshing(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const mapLoop = async () => {
        console.log('Start');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const promises = acceptedLabelCredentials
          .filter((acceptedLabel: any) => {
            if (Object.keys(acceptedLabel).length !== 0) {
              return true;
            }
            return false;
          })
          .map(async (acceptedLabelCredential: any) => {
            const acceptedLabel = new Promise((resolve, reject) => {
              setTimeout(
                () =>
                  resolve(
                    axios.get(
                      `https://api.mt.vsk.gr/credential/w3c/${acceptedLabelCredential?.acceptedLabel}`,
                      {
                        headers,
                      }
                    )
                  ),
                1000
              );
            });
            return acceptedLabel;
          });
        acceptedLabels = await Promise.all(promises)
          .catch((error) => {
            console.log(error, 'TO ERROR');
          })
          .finally(() => {
            setIsRefreshing(false);
          });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(acceptedLabels[0].data, 'TO REFRESH RESPONSE');

        console.log('End');
      };
      mapLoop();
    }
  }, []);

  React.useEffect(() => {
    requestPendingCredentials(true);
  }, [requestPendingCredentials]);

  return (
    <ScreenContainer insets={insets}>
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Credentials</H1>
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
            {acceptedLabels?.map((acceptedLabel, index) => (
              <View>
                <Text>Something</Text>
              </View>
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
            <NotAvailableCredentials isAccepted />
          </PendingCredentialsContentScrollView>
        )}
      </WithLoadingWrapper>
    </ScreenContainer>
  );
};

export default AcceptedCredentialsScreen;
