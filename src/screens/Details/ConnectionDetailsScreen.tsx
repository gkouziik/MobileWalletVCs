import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StatusBar, View } from 'react-native';
import theme from '../../styles/theme';
import { ScreenContainer, HomeTitleInfoContainer, Divider } from './ConnectionDetailsScreen.style';
import { H1, H3 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';

const ConnectionDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<any>();

  const date = new Date(params?.details?.updated_at);

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.onixDeep }}>
      <ScreenContainer insets={insets}>
        <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
        <HomeTitleInfoContainer>
          <H1 color="spaceShade">Connection Details</H1>
          <BodyTextRegular color="spacePure">
            See below for your connection details!
          </BodyTextRegular>
        </HomeTitleInfoContainer>
        <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Connection Date : </H3>
            <BodyTextRegular color="metallicPearlWhite">{formatDate(date)}</BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Company Name : </H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.their_label}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Role : </H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.their_role}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Status : </H3>
            <BodyTextRegular color="metallicPearlWhite">{params?.details?.state}</BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">DID : </H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.their_did}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
        </View>
      </ScreenContainer>
    </ScrollView>
  );
};

export default ConnectionDetailsScreen;
