import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import base64 from 'react-native-base64';
import { useDispatch, useSelector } from 'react-redux';
import { getUserToken } from '../../redux/user';
import { getConnectionsAction, receiveInvitationAction } from '../../redux/connections';
import { ReceiveInvitationParamsType } from '../../providers/connections/types';
import { useAuthentication } from '../../hooks/useAuthentcation';
import theme from '../../styles/theme';
import { TopContentText } from './ScreeToTestQRCode.style';
import Toast from 'react-native-toast-message';

const ScreenTestQR: React.FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuthentication();
  const userToken = useSelector(getUserToken);
  console.log(userToken, 'to token sou ');
  const dispatch = useDispatch();
  console.log(userToken, 'yparxei');

  // React.useEffect(() => {
  //   logout();
  //   // console.log(userToken, 'mesa sto effect');
  //   // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // // @ts-ignore
  //   // dispatch(getConnectionsAction());
  // }, [dispatch]);

  const onCallback = (connectionId?: string, error?: Error) => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, seems that the QR code you are trying to scan is not valid!',
        text2: 'Please try again!',
        position: 'top',
        visibilityTime: 3000,
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'info',
        text1: 'You received an invitation',
        text2: 'Please check the modal for next action',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  const onSuccess = (e: { data: string }) => {
    const params: ReceiveInvitationParamsType = JSON.parse(base64.decode(e?.data));
    console.log(base64.decode(e.data), 'sdsds');
    // vale ena loading state me wrapper gia na fainetai oti fortwnei oso kanei to request

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(receiveInvitationAction(params));
  };
  console.log('here');
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
