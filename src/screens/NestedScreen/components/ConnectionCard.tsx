import React from 'react';
import { Connection } from '../../../redux/connections';
import { View, Text } from 'react-native';
import { ConnectionCardContainerTouchable } from './ConnectionCard.style';
import { H3 } from '../../../components/Components/Headings/Headings.style';
import { BodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';
import theme from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  connection: Connection;
}

const ConnectionCard: React.FC<Props> = ({ connection }) => {
  const navigation = useNavigation();

  const date = new Date(connection?.updated_at);

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
    <ConnectionCardContainerTouchable
      onPress={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('ConnectionDetails', { details: connection });
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
          Active Connection
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
            Date: {formatDate(date)}
          </BodyTextRegular>
          <BodyTextRegular
            bold
            style={{
              color: theme.colors.primary,
            }}
          >
            State: {connection?.state}
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
            Company name: {connection?.their_label}
          </BodyTextRegular>
          <BodyTextRegular
            bold
            style={{
              color: theme.colors.primary,
            }}
          >
            Role: {connection?.their_role}
          </BodyTextRegular>
        </View>
      </View>
    </ConnectionCardContainerTouchable>
  );
};

export default ConnectionCard;
