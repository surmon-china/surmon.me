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
    'vue/attributes-order': 0,
    'vue/script-indent': 0
    //   '@typescript-eslint/no-var-requires': 0,
    //   '@typescript-eslint/explicit-module-boundary-types': 0,
    //   '@typescript-eslint/no-explicit-any': 0,
    //   '@typescript-eslint/no-non-null-assertion': 0,
    //   '@typescript-eslint/no-non-null-assertion': 0,
    //   'import/no-named-as-default-member': 0,
    //   'unicorn/prefer-text-content': 0,
    //   'import/order': 0,
    //   'space-before-function-paren': 0,
    //   'arrow-parens': 0,
    //   'valid-jsdoc': 0,
    //   'func-style': 0,
    //   'vue/singleline-html-element-content-newline': 0,
    //   'vue/component-definition-name-casing': 0,
    //   'vue/require-default-prop': 0,
    //   'vue/component-tags-order': 0,
    //   'vue/no-use-v-if-with-v-for': 0,
    //   'vue/one-component-per-file': 0,
    //   'vue/no-unused-components': 'warn',
    //   'vue/multiline-html-element-content-newline': 0,
    //   'vue/order-in-components': 0,
    //   'vue/max-attributes-per-line': [
    //     'warn',
    //     {
    //       singleline: 4,
    //       multiline: {
    //         max: 1,
    //         allowFirstLine: true,
    //       },
    //     },
    //   ],
  }
}
