import React from 'react';
import {
  ScreenContainer,
  HomeTitleInfoContainer,
  Divider,
} from './StoredCredentialsDetailsScreen.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, View } from 'react-native';
import { H1, H2, H3 } from '../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../components/Components/BodyTexts/BodyTexts.style';
import { useRoute } from '@react-navigation/native';
import theme from '../../styles/theme';

const StoredCredentialsDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { params } = useRoute<any>();

  const date = new Date(params?.details?.cred_value?.issuanceDate);

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  let rooms = [];
  rooms = params?.details?.cred_value?.credentialSubject?.RoomCredential.map((room: string) => {
    const splited = room.split('CAN_ACCESS_');
    return splited[1];
  });

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
          <H1 color="spaceShade">Details</H1>
          <BodyTextRegular color="spacePure">
            See below for your credential details!
          </BodyTextRegular>
        </HomeTitleInfoContainer>
        <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Issuance Date :</H3>
            <BodyTextRegular color="metallicPearlWhite"> {formatDate(date)}</BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Job Title :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.cred_value?.credentialSubject?.jobTitle}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Credential Label :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.record_id}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Email :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.cred_value?.credentialSubject?.email}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Type :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {`${params?.details?.cred_value?.type[0]}`}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Wallet Name :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.cred_value?.credentialSubject.givenName}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Room :</H3>
            <BodyTextRegular color="metallicPearlWhite">{rooms}</BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Proof type :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.cred_value?.proof?.type}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <H3 color="spaceShade">Proof Purpose :</H3>
            <BodyTextRegular color="metallicPearlWhite">
              {params?.details?.cred_value?.proof?.proofPurpose}
            </BodyTextRegular>
          </View>
          <Divider isFocused />
        </View>
      </ScreenContainer>
    </ScrollView>
  );
};

export default StoredCredentialsDetailsScreen;
