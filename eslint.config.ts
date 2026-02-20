import globals from "globals";
import tseslint from 'typescript-eslint';
import pluginReact from "eslint-plugin-react";
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
      files: ["src/**/*.{ts,tsx}"],
      languageOptions: {
          parser: tsParser,
          parserOptions: {
              ecmaVersion: 2021,
              sourceType: "module",
              ecmaFeatures: { jsx: true },
          },
          globals: globals.browser,
      },
      plugins: {
          react: pluginReact,
      },
      extends: [
          tseslint.configs.recommended,
          pluginReact.configs.flat.recommended,
          reactHooks.configs.flat.recommended,
      ],
      settings: {
          react: {
              version: "19.2.0",
          },
      },
      rules: {
          "react/react-in-jsx-scope": "off",
      },
  },
]);
