import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import fp from 'eslint-plugin-fp'
import _import from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import ramda from 'eslint-plugin-ramda'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ...js.configs.recommended
  },
  {
    ignores: [
      'node_modules',
      '.pnpm-lock.yaml',
      'public',
      'dist',
      '.npmrc',
      'reports',
      'lint-staged.config.js',
      'e2e',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx'
    ]
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'google',
      'prettier',
      '@feature-sliced',
      'plugin:fp/recommended',
      'plugin:ramda/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-hooks': fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
      fp: fixupPluginRules(fp),
      ramda: fixupPluginRules(ramda),
      jsdoc
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        warnOnUnsupportedTypeScriptVersion: false
      }
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },

      react: {
        version: 'detect'
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
      'fp/no-arguments': 'error',
      'fp/no-class': 'off',
      'fp/no-delete': 'error',
      'fp/no-events': 'error',
      'fp/no-get-set': 'error',
      'fp/no-let': 'warn',
      'fp/no-loops': 'warn',
      'fp/no-mutating-assign': 'error',
      'fp/no-mutating-methods': 'error',
      'fp/no-mutation': 'warn',
      'fp/no-nil': 'off',
      'fp/no-proxy': 'error',
      'fp/no-rest-parameters': 'error',
      'fp/no-this': 'off',
      'fp/no-throw': 'off',
      'fp/no-unused-expression': 'off',
      'fp/no-valueof-field': 'error',
      'no-var': 'error',
      'react/jsx-curly-brace-presence': [
        1,
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always'
        }
      ],
      'import/no-cycle': 'warn',
      camelcase: 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'new-cap': 0,
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/require-default-props': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-children-prop': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react/jsx-key': 'error',
      'react/prop-types': 'off',
      'no-console': 'off',
      'import/order': 'off',
      'import/no-internal-modules': 'warn',
      'ramda/always-simplification': 'error',
      'ramda/any-pass-simplification': 'error',
      'ramda/both-simplification': 'error',
      'ramda/complement-simplification': 'error',
      'ramda/compose-pipe-style': 'off',
      'ramda/compose-simplification': 'error',
      'ramda/cond-simplification': 'warn',
      'ramda/either-simplification': 'error',
      'ramda/eq-by-simplification': 'error',
      'ramda/filter-simplification': 'error',
      'ramda/if-else-simplification': 'error',
      'ramda/map-simplification': 'error',
      'ramda/merge-simplification': 'error',
      'ramda/no-redundant-and': 'error',
      'ramda/no-redundant-not': 'error',
      'ramda/no-redundant-or': 'error',
      'ramda/pipe-simplification': 'error',
      'ramda/prefer-both-either': 'error',
      'ramda/prefer-complement': 'error',
      'ramda/prefer-ramda-boolean': 'error',
      'ramda/prop-satisfies-simplification': 'error',
      'ramda/reduce-simplification': 'error',
      'ramda/reject-simplification': 'error',
      'ramda/set-simplification': 'error',
      'ramda/unless-simplification': 'error',
      'ramda/when-simplification': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-useless-escape': 'off',
      'spaced-comment': 'off',
      'boundaries/element-types': 'warn'
    }
  }
]
