import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import { ProofCredentialContainerTouchable } from './ProofCredentialsCard.style';
import { H3 } from '../../../components/Components/Headings/Headings.style';
import {
  closeGenericModalAction,
  GenericModalProperties,
  openGenericModalAction,
} from '../../../redux/genericModal';
import { sendPresentProofAction } from '../../../redux/credentials/actions';
import Toast from 'react-native-toast-message';
import theme from '../../../styles/theme';
import { BodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';

interface Props {
  proofCredentialsCard: any;
}

const ProofCredentialsCard: React.FC<Props> = ({ proofCredentialsCard }) => {
  const [isRequestInProcess, setIsRequestInProcess] = useState<boolean>(false);

  console.log('PROOF CREDENTIAL CARD', proofCredentialsCard);

  const onCallback = (error?: Error) => {
    console.log('giati den mpainei sto callback');
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, Something went wrong!',
        text2: 'Please refresh to try again!',
        position: 'top',
        visibilityTime: 2000,
      });
    }
    setIsRequestInProcess(false);
    dispatch(closeGenericModalAction());
  };

  const onPressProofCredentialCard = () => {
    setIsRequestInProcess(true);

    if (proofCredentialsCard.state === 'request-received') {
      console.log(
        proofCredentialsCard.by_format.pres_request.dif.presentation_definition.input_descriptors,
        'VGALE KATI',
        [
          ...proofCredentialsCard.by_format.pres_request.dif.presentation_definition
            .input_descriptors,
        ]
      );
      const params: GenericModalProperties = {
        status: 'success',
        primaryLabel: 'Send Credential',
        title: 'Do you want to send the requested credential ?',
        description: 'By pressing send, you will the verifiable credential to verifier',
        primaryOnPress: () => {
          const params = {
            dif: {
              issuer_id:
                'did:key:zUC76JfTw5iwwa2ujsVT2QK96xqJbcd4PNA1GSnbp1EYRGkY5racRgVrdCUe9gzEVcEWfQQn8crBAgA8mYSEWs6gmbGfxHYAr5P7mRnpHaC88qyccUfESdJvMkZSjxHZvPvbhzR',
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              presentation_definition: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                format: {
                  ldp_vp: {
                    proof_type: ['BbsBlsSignature2020'],
                  },
                },
                input_descriptors: [
                  ...proofCredentialsCard.by_format.pres_request.dif.presentation_definition
                    .input_descriptors,
                ],
              },
            },
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch(sendPresentProofAction(params, proofCredentialsCard.pres_ex_id, onCallback));
          // dispatch(submitSendCredentialsAction())
        },
        secondaryLabel: 'Cancel',
        isLoading: isRequestInProcess,
        secondaryOnPress: () => {
          dispatch(closeGenericModalAction());
        },
      };
      dispatch(openGenericModalAction(params));
    } else {
      // TODO phgaine ton se allo screen
    }
  };

  const dispatch = useDispatch();
  return (
    <ProofCredentialContainerTouchable onPress={onPressProofCredentialCard}>
      <View
        style={{
          flex: 0.02,
          borderRadius: 2,
          width: 5,
          marginLeft: 5,
          height: 70,
          marginTop: 13,
          marginBottom: 5,
          backgroundColor:
            proofCredentialsCard.state === 'request-received'
              ? theme.colors.candyRed
              : theme.colors.bidGreen,
        }}
      />
      <View style={{ flex: 0.98 }}>
        <H3 style={{ alignContent: 'center', alignSelf: 'center', marginTop: 5 }} color="primary">
          Proof Request
        </H3>
        {proofCredentialsCard?.state === 'request-received' ? (
          <>
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
                Company: Alpha Corp
              </BodyTextRegular>
              <BodyTextRegular
                bold
                style={{
                  color: theme.colors.primary,
                }}
              >
                Status: {proofCredentialsCard?.state}
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
                Comment: {proofCredentialsCard?.pres_request?.comment}
              </BodyTextRegular>
            </View>
          </>
        ) : (
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
              Company: Alpha Corp
            </BodyTextRegular>
            <BodyTextRegular
              bold
              style={{
                color: theme.colors.primary,
              }}
            >
              Status: {proofCredentialsCard?.state}
            </BodyTextRegular>
          </View>
        )}
      </View>
    </ProofCredentialContainerTouchable>
  );
};

export default ProofCredentialsCard;
