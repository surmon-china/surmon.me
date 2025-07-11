import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier/recommended'

const jsRules = {
  'no-console': 0,
  'no-irregular-whitespace': 0
}

const tsRules = {
  '@typescript-eslint/ban-ts-comment': 0,
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/no-unused-vars': 0,
  '@typescript-eslint/no-non-null-assertion': 0,
  '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
  '@typescript-eslint/no-unused-expressions': 0,
  '@typescript-eslint/no-unsafe-function-type': 0
}

const vueRules = {
  'vue/script-indent': 0,
  'vue/html-self-closing': 0,
  'vue/require-default-prop': 0,
  'vue/valid-v-slot': 0,
  'vue/valid-template-root': 0,
  'vue/multi-word-component-names': 0,
  'vue/attributes-order': 0,
  'vue/no-v-html': 0
}

const prettierRules = {
  'prettier/prettier': 'warn'
}

// https://github.com/Shyam-Chen/Vue-Starter/blob/main/eslint.config.js
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  { rules: jsRules },
  ...ts.configs.recommended,
  { rules: tsRules },
  ...vue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  { rules: vueRules },
  {
    ignores: ['node_modules', 'dist', 'public', 'bundler', 'scripts']
  },
  prettier,
  { rules: prettierRules }
]
