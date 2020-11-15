module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-links/register",
    "@storybook/addon-controls",
    "@storybook/addon-storysource/register",
    "@storybook/addon-essentials",
  ],
};