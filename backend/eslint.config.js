import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true,
      },
    },
  },
  {
    rules: {
      "no-undef": "off",
    },
  },
  pluginJs.configs.recommended,
];
