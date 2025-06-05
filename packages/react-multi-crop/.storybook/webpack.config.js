module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(stories|story)\.(jsx|tsx)?$/,
    exclude: [/node_modules/],
    enforce: 'pre',
  });

  return config;
};
