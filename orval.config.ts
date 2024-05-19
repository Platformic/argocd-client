export default {
  argocd: {
    input: './specs/argocd-2.11.0.json',
    output: {
      mode: 'split',
      target: './src/generated/argocd.ts',
      override: {
        mutator: {
          path: './src/lib/http-client.ts',
          name: 'httpClient',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npm run fix-esm-imports',
    }
  },
}