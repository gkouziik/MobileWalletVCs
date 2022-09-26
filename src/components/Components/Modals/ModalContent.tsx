import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Portal } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../styles/theme';
import SVG from '../SVG/SVG';
import { ColorsType } from '../../../styles/types';
import { BodyTextRegular } from '../BodyTexts/BodyTexts.style';
import { FULL_DEVICE_WIDTH, FULL_DEVICE_HEIGHT } from '../../../utils/constants';
import {
  closeGenericModalAction,
  GenericModalProperties,
  GenericModalStatuses,
} from '../../../redux/genericModal';

import {
  Icon,
  Title,
  Container,
  PrimaryButton,
  ButtonsWrapper,
  MessageWrapper,
  SecondaryButton,
  FormValidationWrapper,
} from './ModalContent.style';

interface Props {
  params: GenericModalProperties;
}

const ModalContent: React.FC<Props> = ({ params }) => {
  const dispatch = useDispatch();
  const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState<boolean | undefined>(false);
  const closeModal = () => dispatch(closeGenericModalAction());

  const {
    icon,
    title,
    status = 'success',
    description,
    primaryLabel,
    formComponent,
    primaryOnPress,
    secondaryLabel,
    bottomLinkLabel,
    isLoading = false,
    blurView = true,
    secondaryOnPress,
    isNotice = false,
    outsetColorShadow,
    color = 'candyYellow',
    isTransparent = true,
    gradientContainerStyle,
    descriptionColor = 'cardinalBlue',
  } = params;

  const gradientColors = {
    warning: Array.from({ length: 3 }).fill(theme.colors.linearPink),
    error: Array.from({ length: 3 }).fill(theme.colors.cardinalPurple),
    success: Array.from({ length: 3 }).fill(theme.colors.linearPurple),
  } as Record<GenericModalStatuses, string[]>;

  const PrimaryGradientColors = {
    warning: ['buttonDelete', 'linearPink'],
    error: ['buttonAltered', 'linearPurple'],
    success: ['cardinalTeal', 'cardinalPurple'],
  } as Record<GenericModalStatuses, ColorsType[]>;

  const primaryOnPressOverride = () => {
    setIsPrimaryButtonLoading(isLoading);
    primaryOnPress?.();
  };

  return (
    <Portal>
      {status && (
        <Fragment>
          <LinearGradient
            locations={[0, 0, 0]}
            end={{ x: 0.5, y: 1.0 }}
            start={{ x: 0.0, y: 0.25 }}
            colors={gradientColors[status]}
          >
            {status && (
              <SVG width={FULL_DEVICE_WIDTH} height={FULL_DEVICE_HEIGHT} icon={'successModal'} />
            )}
          </LinearGradient>
        </Fragment>
      )}

      {blurView && (
        <BlurView
          blurType="light"
          blurAmount={30}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          }}
          overlayColor="rgba(20, 20, 29, 0.66)"
        />
      )}

      <Modal
        visible={true}
        onDismiss={closeModal}
        contentContainerStyle={{
          width: '100%',
          borderRadius: 30,
          alignSelf: 'center',
          paddingHorizontal: 31.5,
          alignItems: formComponent ? 'center' : 'stretch',
          backgroundColor: isTransparent ? theme.colors.transparent : theme.colors.obsidian,
        }}
      >
        <Container>
          {icon && <Icon color="metallicPearlWhite">{icon}</Icon>}

          <Title color="metallicPearlWhite">{title}</Title>

          {description && (
            <MessageWrapper>
              <BodyTextRegular color={descriptionColor} bold center>
                {description}
              </BodyTextRegular>
            </MessageWrapper>
          )}

          {formComponent && <FormValidationWrapper>{formComponent}</FormValidationWrapper>}

          <ButtonsWrapper justify={primaryLabel && secondaryLabel ? 'space-between' : 'center'}>
            {primaryLabel && !secondaryLabel && status && (
              <PrimaryButton
                size="stretch"
                angle={91.85}
                borderRadius={21}
                title={primaryLabel}
                style={{ flex: 0.7 }}
                outsetColorShadow={outsetColorShadow}
                onPress={primaryOnPress || closeModal}
                linearColors={PrimaryGradientColors[status]}
              />
            )}

            {primaryLabel && secondaryLabel && status && (
              <Fragment>
                <SecondaryButton
                  size="medium"
                  mode="outlined"
                  borderRadius={21}
                  color="spaceLight"
                  backgroundColor="spaceDeep"
                  onPress={secondaryOnPress}
                >
                  {secondaryLabel}
                </SecondaryButton>

                <PrimaryButton
                  isLoading={isPrimaryButtonLoading}
                  size="stretch"
                  angle={91.85}
                  borderRadius={21}
                  title={primaryLabel}
                  onPress={primaryOnPressOverride}
                  outsetColorShadow={outsetColorShadow}
                  linearColors={PrimaryGradientColors[status]}
                  gradientContainerStyle={gradientContainerStyle}
                />
              </Fragment>
            )}
          </ButtonsWrapper>
        </Container>
      </Modal>
    </Portal>
  );
};

export default ModalContent;
