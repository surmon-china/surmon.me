module.exports = {
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'prettier/prettier': 'error',
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
