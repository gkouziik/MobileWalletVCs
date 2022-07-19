import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';

import { InputsWrapper, WalletLabelInput } from './InputsDetails.style';
import theme from '../../../styles/theme';
import { useFormValidation } from '../../../hooks/useFormValidation';
import CTGradientButton from '../../../components/Components/Buttons/CTGrradientButton';

import { HelperText } from 'react-native-paper';
import userApi from '../../../providers/user';

type WalletDetailsForm = {
  walletLabel: string;
  walletRetrievePassword: string;
};

const InputsDetails: React.FC = () => {
  const { walletDetailsValidation } = useFormValidation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletDetailsForm>();

  const onCallback = (error?: Error) => {
    setIsLoading(false);
    if (error) {
      //TODO add a toast message
      return;
    }
  };

  const submitWalletDetails = async (data: WalletDetailsForm) => {
    setIsLoading(true);
    // const params: SetWalletPreCreationDataPayloadType = {
    //   walletLabel: data.walletLabel,
    //   walletRetrievePassword: data.walletRetrievePassword,
    // };
    // dispatch(setWalletPreCreationDataAction(params));
    const { request } = userApi.single.createWalletApi({
      image_url: 'https://aries.ca/images/sample.png',
      key_management_mode: 'managed',
      label: 'EmployeeOne',
      wallet_dispatch_type: 'both',
      wallet_key: 'ultra-secret-password',
      wallet_name: 'wallet3',
      wallet_type: 'indy',
      wallet_webhook_urls: [],
    });

    const response = await request();
    setIsLoading(false);
  };

  return (
    <Fragment>
      <InputsWrapper>
        <Controller
          name="walletLabel"
          control={control}
          render={({ field }) => (
            <WalletLabelInput
              mode="outlined"
              textContentType="emailAddress"
              placeholderTextColor={theme.colors.spaceLight}
              error={Boolean(errors.walletLabel)}
              theme={{ roundness: 38 }}
              placeholder={'Add a label for your wallet'}
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              style={{ opacity: 0.4 }}
            />
          )}
          rules={walletDetailsValidation}
        />
        {errors.walletLabel && (
          <HelperText testID="emailValidator" type="error" visible={Boolean(errors.walletLabel)}>
            <Text>{errors.walletLabel?.message}</Text>
          </HelperText>
        )}
        <Controller
          name="walletRetrievePassword"
          control={control}
          render={({ field }) => (
            <WalletLabelInput
              mode="outlined"
              placeholderTextColor={theme.colors.spaceLight}
              error={Boolean(errors.walletRetrievePassword)}
              theme={{ roundness: 38 }}
              placeholder={'Add a retrieve password for your wallet'}
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              style={{ opacity: 0.4 }}
            />
          )}
          rules={walletDetailsValidation}
        />
        {errors.walletRetrievePassword && (
          <HelperText
            testID="emailValidator"
            type="error"
            visible={Boolean(errors.walletRetrievePassword)}
          >
            <Text>{errors.walletRetrievePassword?.message}</Text>
          </HelperText>
        )}
      </InputsWrapper>
      <CTGradientButton
        title={'Submit'}
        size={'stretch'}
        linearColors={['cardinalTeal', 'cardinalPurple']}
        angle={91.85}
        borderRadius={21}
        onPress={handleSubmit(submitWalletDetails)}
        outsetColorShadow="cardinalTealShadow"
        accessibilityLabel="Submit Email"
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default InputsDetails;
