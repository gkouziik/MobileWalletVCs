import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { InputsWrapper, WalletLabelInput } from './InputsDetails.style';
import theme from '../../../styles/theme';
import { useFormValidation } from '../../../hooks/useFormValidation';
import CTGradientButton from '../../../components/Components/Buttons/CTGrradientButton';

import { HelperText } from 'react-native-paper';
import { setCreateWalletAction } from '../../../redux/user';
import { CreateWalletParamType } from '../../../providers/user/types';
import { useAuthentication } from '../../../hooks/useAuthentcation';

type WalletDetailsForm = {
  walletLabel: string;
  walletRetrievePassword: string;
};

const InputsDetails: React.FC = () => {
  const { login, logout } = useAuthentication();
  const { walletDetailsValidation } = useFormValidation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletDetailsForm>();

  const onCallback = async (jwtToken?: string, error?: Error) => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops, Something went wrong!',
        text2: 'Please try again with a different wallet label',
        position: 'top',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'You successfully created your Wallet!',
        position: 'top',
        visibilityTime: 3000,
      });
      await login(jwtToken);
    }
    setIsLoading(false);
  };

  const submitWalletDetails = (data: WalletDetailsForm) => {
    console.log(data);
    setIsLoading(true);
    // dispatch(setWalletPreCreationDataAction(params));
    const params: CreateWalletParamType = {
      image_url: 'https://aries.ca/images/sample.png',
      key_management_mode: 'managed',
      label: 'EmployeeOne',
      wallet_dispatch_type: 'both',
      wallet_key: data.walletRetrievePassword,
      wallet_name: data.walletLabel,
      wallet_type: 'indy',
      wallet_webhook_urls: [],
      onCallback,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(setCreateWalletAction(params));
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
              outlineColor={theme.colors.spaceLight}
              placeholderTextColor={theme.colors.spaceLight}
              error={Boolean(errors.walletLabel)}
              theme={{ roundness: 38, colors: { text: theme.colors.white } }}
              placeholder={'Add a label for your wallet'}
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              style={{ opacity: 0.4, backgroundColor: theme.colors.background }}
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
              outlineColor={theme.colors.spaceLight}
              placeholderTextColor={theme.colors.spaceLight}
              error={Boolean(errors.walletRetrievePassword)}
              theme={{ roundness: 38, colors: { text: theme.colors.white } }}
              placeholder={'Add a retrieve password for your wallet'}
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              style={{ opacity: 0.4, backgroundColor: theme.colors.background }}
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
        onPress={handleSubmit((data) => submitWalletDetails(data))}
        outsetColorShadow="cardinalTealShadow"
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default InputsDetails;
