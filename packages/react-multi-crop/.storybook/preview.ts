import { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      codePanel: true,
      tags: ['autodocs'],
    },
  },
};

export default preview;
