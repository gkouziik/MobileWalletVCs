import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { HomeTitleInfoContainer, ScreenContainer } from './NestedScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { getConnectionsAction } from '../../redux/connections';
import { getUserToken } from '../../redux/user';

import { useAuthentication } from '../../hooks/useAuthentcation';

const NestedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);
  const { logout } = useAuthentication();

  // React.useEffect(() => {
  //   logout();
  // }, []);

  React.useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get('https://api.mt.vsk.gr/connections', { headers })
      .then((response) => {
        console.log(response.data, 'to response');
      })
      .catch((error) => {
        console.log(error, 'to error');
      });
  }, []);

  return (
    <ScreenContainer insets={insets}>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
      <HomeTitleInfoContainer>
        <H1 color="spaceShade">Connections</H1>
        <BodyTextRegular color="spacePure">
          All your connections right in one place!
        </BodyTextRegular>
      </HomeTitleInfoContainer>
    </ScreenContainer>
  );
};

export default NestedScreen;
