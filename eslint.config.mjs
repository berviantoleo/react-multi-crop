import { globalIgnores } from "eslint/config";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        HTMLCanvasElement: true,
        HTMLDivElement: true,
        document: true,
        window: true,
        React: true,
        cy: true,
        ...globals.node,
        ...globals.jest,
        ...globals.serviceworker,
      },
    },
  },
  globalIgnores([
    "node_modules/*",
    "packages/react-multi-crop/node_modules/*",
    "packages/react-multi-crop/dist/*",
    "docs/*",
    "examples/demo/build/*",
    "examples/demo/node_modules/*",
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/jsx-uses-react": "warn",
      "react/react-in-jsx-scope": "warn",
    },
  },
  eslintPluginPrettierRecommended,
  {
    plugins: {
      cypress,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
);
