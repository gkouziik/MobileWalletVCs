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
import theme from '../../styles/theme';
import NotAvailableCredentials from './components/NotAvailableCredentials';
import AcceptedCredentialCard from './components/AcceptedCredentialCard';

const AcceptedCredentialsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const acceptedLabelCredentials = useSelector(getAcceptedLabelCredentials);
  const userToken = useSelector(getUserToken);
  const dispatch = useDispatch();
  const [isLoadingPending, setIsLoadingPending] = useState<boolean>(true);
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const [storedCredentials, setStoredCredentials] = useState<any>([]);
  const [isLoadingCompleted, setIsLoadingCompleted] = useState<boolean>(true);

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
        setStoredCredentials((prevState: any) => [...prevState, acceptedLabels]);
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
        setStoredCredentials((prevState: any) => [...prevState, acceptedLabels]);

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
        <H1 color="spaceShade">Stored Credentials</H1>
        <BodyTextRegular color="spacePure">
          All your credentials right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
      <WithLoadingWrapper isLoading={isLoadingPending}>
        {storedCredentials?.length && storedCredentials && storedCredentials[0]?.length > 0 ? (
          <PendingCredentialsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={requestPendingCredentials}
              />
            }
          >
            {storedCredentials[0]?.map(
              (storedCredential: any, index: React.Key | null | undefined) => (
                <AcceptedCredentialCard acceptedCredentialCard={storedCredential} key={index} />
              )
            )}
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
