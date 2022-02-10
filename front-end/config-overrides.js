const { override, addWebpackAlias, overrideDevServer } = require('customize-cra');
const path = require('path');

module.exports = {
  webpack: override(
    addWebpackAlias({
      _: path.resolve(__dirname, 'src'),
    }),
  ),
};
