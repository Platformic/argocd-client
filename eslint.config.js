import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
    }
  },
  {
    ignores: ['dist/*', 'scripts/*']
  }
]