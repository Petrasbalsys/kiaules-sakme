import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactThree from "@react-three/eslint-plugin";
import { defineConfig } from "eslint/config";
import path from "path";

export default defineConfig([
  // JavaScript base config
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript parser + JSX
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.resolve('./tsconfig.json'),
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // TypeScript recommended rules
  tseslint.configs.recommended,

  // React rules with JSX runtime disabled rule
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off", 
    },
    settings: {
      react: {
        version: "detect",
        jsxRuntime: "automatic",
      },
    },
  },

  // React Three plugin
  {
    files: ["**/R3F*.{ts,tsx}"],
    plugins: {
      "@react-three": reactThree,
    },
    rules: {
      ...reactThree.configs.recommended.rules,
      "react/no-unknown-property": "off"
    },
  },
]);
