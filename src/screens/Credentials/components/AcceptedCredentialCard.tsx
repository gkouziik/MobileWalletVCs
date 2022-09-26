import React, { useState } from 'react';
import { ConnectionCardContainerTouchable } from './AcceptedCredentialCard.style';
import { View } from 'react-native';
import { H3 } from '../../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';
import theme from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  acceptedCredentialCard: any;
}

const AcceptedCredentialCard: React.FC<Props> = ({ acceptedCredentialCard }) => {
  const navigation = useNavigation();

  console.log(acceptedCredentialCard.data, 'GIA KATHE ENA');
  return (
    <ConnectionCardContainerTouchable
      onPress={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('StoredCredentialsDetails', { details: acceptedCredentialCard.data });
      }}
    >
      <View
        style={{
          flex: 0.02,
          borderRadius: 2,
          width: 5,
          marginLeft: 5,
          height: 70,
          marginTop: 13,
          marginBottom: 5,
          backgroundColor: '#66A500',
        }}
      />
      <View style={{ flex: 0.98 }}>
        <H3 style={{ alignContent: 'center', alignSelf: 'center', marginTop: 5 }} color="bidGreen">
          Stored Credential
        </H3>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 7,
            marginRight: 5,
            marginTop: 10,
          }}
        >
          <BodyTextRegular
            bold
            style={{
              color: theme.colors.primary,
            }}
          >
            Email: {acceptedCredentialCard?.data?.cred_value?.credentialSubject?.email}
          </BodyTextRegular>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: 7,
            marginRight: 5,
            marginTop: 10,
          }}
        >
          <BodyTextRegular
            bold
            style={{
              color: theme.colors.primary,
            }}
          >
            Job Title: {acceptedCredentialCard?.data?.cred_value?.credentialSubject?.jobTitle}
          </BodyTextRegular>
          <BodyTextRegular
            bold
            style={{
              color: theme.colors.primary,
            }}
          >
            Label: {acceptedCredentialCard?.data?.record_id}
          </BodyTextRegular>
        </View>
      </View>
    </ConnectionCardContainerTouchable>
  );
};

export default AcceptedCredentialCard;
