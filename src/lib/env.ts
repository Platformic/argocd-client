import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    ARGOCD_API_URL: z.string().url(),
    ARGOCD_API_TOKEN: z.string().min(1)
  },
  runtimeEnvStrict: {
    ARGOCD_API_URL: process.env.ARGOCD_API_URL,
    ARGOCD_API_TOKEN: process.env.ARGOCD_API_TOKEN
  },
  emptyStringAsUndefined: true
})