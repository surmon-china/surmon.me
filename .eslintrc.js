/**
 * @file Eslint config
 * @module eslint/config
 * @author Surmon <https://github.com/surmon-china>
*/

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  globals: {
    Set: true,
    Howl: true,
    window: true,
    Reflect: true,
    Promise: true,
    arguments: true,
    document: true,
    localStorage: true,
    FaceDetector: true,
    requestAnimFrame: true,
  },
  rules: {
    'vue/no-v-html': 'off',
    'vue/valid-v-slot': 'off',
    'vue/valid-template-root': 'off',
    'vue/attributes-order': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/require-default-prop': 'off',
    'vue/component-tags-order': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-unused-components': 'warn',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/order-in-components': 'off',
    'vue/html-self-closing': ["error", {
      "html": {
        "void": "never",
        "normal": "any",
        "component": "any"
      },
      "svg": "always",
      "math": "always"
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }],

    // 禁止在代码中出现没有被使用到的表达式或值
    'no-unused-expressions': 'off',
    'import/no-named-as-default-member': 'off',
    'unicorn/prefer-text-content': 'off',
    'import/order': 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    'quotes': 'off',
    'no-console': 'off',
    'valid-jsdoc': 'off',
    'func-style': 'off',
  }
}
