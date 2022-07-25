import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';

import { HomeTitleInfoContainer, ScreenContainer } from './NestedScreen.style';
import { H1 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { getConnectionsAction } from '../../redux/connections';

const NestedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getConnectionsAction());
  }, [dispatch]);

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
