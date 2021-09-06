import { configure, addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
configure(require.context("../src", true, /\.stories\.(js|ts|jsx|tsx)$/), module);