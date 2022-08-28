import React from 'react';
import { Connection } from '../../../redux/connections';
import { View, Text } from 'react-native';

interface Props {
  connection: Connection;
}

const ConnectionCard: React.FC<Props> = ({ connection: Connection }) => {
  return (
    <View>
      <Text>Here The connection</Text>
    </View>
  );
};

export default ConnectionCard;
