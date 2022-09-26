export const useFormValidation = () => {
  const walletDetailsValidation = {
    required: {
      value: true,
      message: 'This field can not be left blank',
    },
  };

  return {
    walletDetailsValidation,
  };
};
