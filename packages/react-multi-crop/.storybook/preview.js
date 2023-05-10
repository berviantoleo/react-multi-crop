import { configure } from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
configure(require.context("../src", true, /\.stories\.(js|ts|jsx|tsx)$/), module);