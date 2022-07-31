import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import base64 from 'react-native-base64';
import { useDispatch, useSelector } from 'react-redux';

import { getUserToken } from '../../redux/user';
import { acceptInvitationAction, receiveInvitationAction } from '../../redux/connections';
import { ReceiveInvitationParamsType } from '../../providers/connections/types';
import { useAuthentication } from '../../hooks/useAuthentcation';
import theme from '../../styles/theme';
import { TopContentText } from './ScreeToTestQRCode.style';
import {
  closeGenericModalAction,
  GenericModalProperties,
  openGenericModalAction,
} from '../../redux/genericModal';

const ScreenTestQR: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuthentication();
  const userToken = useSelector(getUserToken);
  console.log(userToken, 'to token sou ');
  const dispatch = useDispatch();

  const onAcceptInvitationCallback = (error: Error) => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, Something went wrong!',
        text2: 'Please try again!',
        position: 'top',
        visibilityTime: 3000,
      });
    }
    dispatch(closeGenericModalAction());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('NestedTab');
  };

  const onCallback = (connectionId?: string, error?: Error) => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, seems that the QR code you are trying to scan is not valid!',
        text2: 'Please try again!',
        position: 'top',
        visibilityTime: 3000,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate('HomeScreen');
    } else {
      const modalParams: GenericModalProperties = {
        status: 'success',
        primaryLabel: 'Accept Invitation',
        title: 'You want to accept the invitation you received?',
        isLoading: true,
        primaryOnPress: () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch(acceptInvitationAction(connectionId, onAcceptInvitationCallback));
        },
        secondaryLabel: 'Cancel',
        secondaryOnPress: () => {
          dispatch(closeGenericModalAction());
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          navigation.navigate('HomeScreen');
        },
      };
      dispatch(openGenericModalAction(modalParams));
    }
  };

  const onSuccess = (e: { data: string }) => {
    const params: ReceiveInvitationParamsType = JSON.parse(base64.decode(e?.data));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(receiveInvitationAction(params, onCallback));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<TopContentText>Scan your QR code to create an invitation!</TopContentText>}
        bottomContent={
          <TouchableOpacity style={{ padding: 16 }}>
            <Text style={{ fontSize: 21, color: theme.colors.primary }}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default ScreenTestQR;
