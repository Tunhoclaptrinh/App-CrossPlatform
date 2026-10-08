const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration for ultra-high performance bundling & cold start speed
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: [
      /.*[/\\]android[/\\]app[/\\]build[/\\].*/,
      /.*[/\\]android[/\\]\.gradle[/\\].*/,
      /.*[/\\]android[/\\]build[/\\].*/,
      /.*[/\\]ios[/\\]build[/\\].*/,
      /.*[/\\]ios[/\\]Pods[/\\].*/,
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

