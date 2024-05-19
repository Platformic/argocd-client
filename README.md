# ArgoCD Client

Simple client build using orval and fetch

## How to use use it?
```
import argocd from "argocd-client";

const run = async () => {
  try {
    await argocd.applicationServiceGet('ingress-nginx')
  } catch (error) {
    console.log(error.message)
  }
}

run()
```

## Generate types with orval
1. Download ArgoCD swagger spects with curl
2. Modify orval.config.ts input to path new spects
3. Run npm run generate
4. Modify src/generated/argocd.ts and fix import paths extensions ([Github Issue](https://github.com/anymaniax/orval/issues/1232))