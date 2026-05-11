import coreWebVitalsConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'

const config = [
  ...coreWebVitalsConfig,
  prettierConfig,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  {
    ignores: [
      '**/.next/**',
      'node_modules/**',
      '__mocks__/**',
      'jest.config.ts',
      'jest.setup.ts',
      'components/ui/**',
      'hooks/use-mobile.ts',
      'coverage/**',
    ],
  },
]

export default config
