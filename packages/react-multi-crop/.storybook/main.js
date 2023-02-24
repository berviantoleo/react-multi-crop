module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links/register",
    "@storybook/addon-storysource/register",
    "@storybook/addon-essentials",
  ],
  core: {
    builder: 'webpack5',
  },
};
