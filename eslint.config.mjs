import { defineConfig, globalIgnores } from "eslint/config";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "node_modules/*",
    "packages/react-multi-crop/node_modules/*",
    "packages/react-multi-crop/dist/*",
    "docs/*",
    "examples/demo/build/*",
    "examples/demo/node_modules/*",
  ]),
  {
    extends: compat.extends(
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ),

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

    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
]);
