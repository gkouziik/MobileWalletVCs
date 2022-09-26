import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { CredentialsLabel } from './CredentialCard';
import { CredentialsLabelTitle, CredentialStyledInput } from './CredentialsLabelFrom.style';
import theme from '../../../styles/theme';

interface Props {
  control?: Control<CredentialsLabel>;
  errors?: any;
}

const CredentialsLabelForm: React.FC<Props> = ({ control, errors }) => {
  return (
    <View style={{ alignSelf: 'center', alignItems: 'center' }}>
      <CredentialsLabelTitle color="secondary">Your credential's label</CredentialsLabelTitle>
      <Controller
        name={'credentialsLabel'}
        control={control}
        render={({ field }) => (
          <CredentialStyledInput
            mode="outlined"
            outlineColor={theme.colors.spaceLight}
            placeholderTextColor={theme.colors.spaceLight}
            theme={{ roundness: 38, colors: { text: theme.colors.white } }}
            value={field.value}
            onChangeText={(text: string) => field.onChange(text)}
            style={{ opacity: 0.4, backgroundColor: theme.colors.background }}
          />
        )}
      />
    </View>
  );
};

export default CredentialsLabelForm;
