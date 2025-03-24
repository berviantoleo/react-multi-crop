import { StorybookConfig } from '@storybook/types';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-storysource', '@storybook/addon-essentials'],
  framework: '@storybook/react-webpack5',
  docs: {
    autodocs: true,
  },
};

export default config;
