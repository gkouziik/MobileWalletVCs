// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { getDefaultConfig } = require('metro-config');

// eslint-disable-next-line no-undef
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
