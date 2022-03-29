const { override, addWebpackAlias, addBabelPlugins, useBabelRc } = require('customize-cra');
const path = require('path');

const emotionPresetOptions = {
  sourceMap: true,
  autoLabel: 'dev-only',
  labelFormat: '[dirname]--[filename]--[local]',
  cssPropOptimization: true,
};

const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(
  undefined,
  emotionPresetOptions,
);

module.exports = {
  webpack: override(
    useBabelRc(),
    ...addBabelPlugins(...emotionBabelPreset.plugins),
    addWebpackAlias({
      _: path.resolve(__dirname, 'src'),
    }),
  ),
};
