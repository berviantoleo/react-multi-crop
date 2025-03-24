module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(stories|story)\.(jsx|tsx)?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  return config;
};
