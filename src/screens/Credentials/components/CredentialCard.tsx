import React, { useState } from 'react';
import {
  AcceptRequestParams,
  getAcceptedLabelCredentials,
  PendingRequest,
} from '../../../redux/credentials';
import { ConnectionCardContainerTouchable, StyledTitle } from './CredentailCard.style';
import { useForm } from 'react-hook-form';

import { H2, H3 } from '../../../components/Components/Headings/Headings.style';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeGenericModalAction,
  GenericModalProperties,
  openGenericModalAction,
} from '../../../redux/genericModal';
import CredentialsLabelForm from './CredentialsLabelForm';
import { getDidKey } from '../../../redux/user';
import {
  acceptPendingCredentialRequestAction,
  storeAcceptedCredentialRequest,
} from '../../../redux/credentials/actions';
import { BodyTextRegular } from '../../../components/Components/BodyTexts/BodyTexts.style';
import theme from '../../../styles/theme';

interface Props {
  credential: PendingRequest;
}

export type CredentialsLabel = {
  credentialsLabel?: string;
};

const CredentialCard: React.FC<Props> = ({ credential }) => {
  const dispatch = useDispatch();
  const acceptedLabels = useSelector(getAcceptedLabelCredentials);
  const [isRequestInProcess, setIsRequestInProcess] = useState<boolean>(false);
  const didKey = useSelector(getDidKey);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CredentialsLabel>();

  const onCallback = (cred_ex_id?: string, credential_id?: string, error?: Error) => {
    if (error) {
      setIsRequestInProcess(false);
      dispatch(closeGenericModalAction());
      // TODO vale toast
      console.log(error, 'apo pou eskase h malakia');
    } else {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(storeAcceptedCredentialRequest(cred_ex_id, credential_id));
        setIsRequestInProcess(false);
        dispatch(closeGenericModalAction());
      }, 5000);

      // TODO prepei na ton kaneis navigate sto issued credentials page kai na kaneis kai request
    }
  };

  const submitAcceptCredentials = (data: Required<CredentialsLabel>) => {
    setIsRequestInProcess(true);
    console.log(data.credentialsLabel, 'here');
    const params: AcceptRequestParams = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      holder_did: didKey,
      credential_id: data.credentialsLabel,
      cred_ex_id: credential.cred_ex_record.cred_ex_id,
      onCallback,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(acceptPendingCredentialRequestAction(params));
  };

  const onPressPendingCredentialCard = () => {
    const params: GenericModalProperties = {
      status: 'success',
      primaryLabel: 'Accept Invitation',
      title: 'Do you want to accept the invitation you received?',
      description: 'If you accept the invitation, the issuer will issue to you credentials!',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      primaryOnPress: () => handleSubmit(submitAcceptCredentials)(),
      formComponent: (
        <CredentialsLabelForm control={control} errors={errors}></CredentialsLabelForm>
      ),
      isLoading: isRequestInProcess,
      secondaryLabel: 'Cancel',
      secondaryOnPress: () => {
        dispatch(closeGenericModalAction());
      },
    };
    dispatch(openGenericModalAction(params));
  };

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

  const date = new Date(credential.cred_ex_record.updated_at);
  return (
    <>
      {credential.cred_ex_record.state === 'offer-received' ? (
        <ConnectionCardContainerTouchable onPress={onPressPendingCredentialCard}>
          <View
            style={{
              flex: 0.02,
              borderRadius: 2,
              width: 5,
              marginLeft: 5,
              height: 70,
              marginTop: 13,
              marginBottom: 5,
              backgroundColor: 'red',
            }}
          />
          <View style={{ flex: 0.98 }}>
            <H3
              style={{ alignContent: 'center', alignSelf: 'center', marginTop: 5 }}
              color="candyRed"
            >
              Pending Credential
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
                Company: Alpha Corp
              </BodyTextRegular>
              <BodyTextRegular
                bold
                style={{
                  color: theme.colors.primary,
                }}
              >
                Role: {credential.cred_ex_record.role}
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
                State: {credential.cred_ex_record.state}
              </BodyTextRegular>
              <BodyTextRegular
                bold
                style={{
                  color: theme.colors.primary,
                }}
              >
                Date: {formatDate(date)}
              </BodyTextRegular>
            </View>
          </View>
        </ConnectionCardContainerTouchable>
      ) : null}
    </>
  );
};

export default CredentialCard;
