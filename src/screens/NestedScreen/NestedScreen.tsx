import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, RefreshControl, AppStateStatus, AppState } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  ConnectionsContentScrollView,
  HomeTitleInfoContainer,
  ScreenContainer,
} from './NestedScreen.style';
import { H1, H2 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { getConnections, setConnectionsAction } from '../../redux/connections';
import { getUserToken } from '../../redux/user';

import { useAuthentication } from '../../hooks/useAuthentcation';
import Toast from 'react-native-toast-message';
import WithLoadingWrapper from '../../components/Wrappers/WithLoadingWrapper';
import NotAvailableConnections from './components/NotAvailableConnections';
import theme from '../../styles/theme';
import ConnectionCard from './components/ConnectionCard';

const NestedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const dispatch = useDispatch();
  const connections = useSelector(getConnections);
  const userToken = useSelector(getUserToken);
  const { logout } = useAuthentication();
  //
  // React.useEffect(() => {
  //   logout();
  // }, []);

  const requestConnections = React.useCallback((initialLoading = false) => {
    console.log(initialLoading, 'edw initialLoading');
    if (initialLoading) {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/connections', { headers })
        .then((response) => {
          dispatch(setConnectionsAction(response.data.results));
          console.log(response.data, 'to response');
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
          setIsLoading(false);
        });
    } else {
      setIsRefreshing(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get('https://api.mt.vsk.gr/connections', { headers })
        .then((response) => {
          dispatch(setConnectionsAction(response.data.results));
          console.log(response.data, 'to response');
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
    requestConnections(true);
  }, [requestConnections]);

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Connections</H1>
        <BodyTextRegular color="spacePure">
          All your connections right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
      <WithLoadingWrapper isLoading={isLoading}>
        {connections && connections.length > 0 ? (
          <ConnectionsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={requestConnections}
              />
            }
          >
            {connections?.map((connection, index) => (
              <ConnectionCard connection={connection} key={index} />
            ))}
          </ConnectionsContentScrollView>
        ) : (
          <ConnectionsContentScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={[theme.colors.secondary]}
                onRefresh={requestConnections}
              />
            }
          >
            <NotAvailableConnections />
          </ConnectionsContentScrollView>
        )}
      </WithLoadingWrapper>
    </ScreenContainer>
  );
};

export default NestedScreen;
