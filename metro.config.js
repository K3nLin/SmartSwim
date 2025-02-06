// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, { input: "./global.css" });

// Learn more https://docs.expo.io/guides/customizing-metro

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  const {
    resolver: { sourceExts, assetExts },
  } = config;

  return withNativeWind(
    {
      ...config,
      transformer: {
        ...config.transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
      },
      resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
      },
    },
    { input: "./global.css" }
  );
})();
