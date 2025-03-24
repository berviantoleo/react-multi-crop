import { Preview } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/blocks';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      container: DocsContainer,
      page: DocsPage,
    },
  },
};

export default preview;
