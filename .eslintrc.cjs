// https://github.com/vuejs/eslint-config-prettier/blob/main/index.js
// https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
    'no-console': 0,
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'vue/valid-v-slot': 0,
    'vue/valid-template-root': 0,
    'vue/multi-word-component-names': 0,
    'vue/attributes-order': 0,
    'vue/script-indent': 0,
    'vue/require-default-prop': 0
  }
}
