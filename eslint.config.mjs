import { defineConfig, globalIgnores } from "eslint/config";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  eslint.configs.recommended,
  {
    files: ['**/.{ts,tsx}'],
    rules: {
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    },
    ...tseslint.configs.recommended,
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintPluginPrettierRecommended,
  globalIgnores([
    "node_modules/*",
    "packages/react-multi-crop/node_modules/*",
    "packages/react-multi-crop/dist/*",
    "docs/*",
    "examples/demo/build/*",
    "examples/demo/node_modules/*",
  ]),
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
);
