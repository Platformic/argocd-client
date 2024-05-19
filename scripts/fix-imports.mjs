#!/usr/bin/env zx

import { writeFileSync, readFileSync, existsSync } from "fs"

const generatedFiles = (await $`find src/generated -type f -name "*.ts"`).stdout.split('\n')
for (const generatedFile of generatedFiles) {
  if(!existsSync(generatedFile)) break
  const file = readFileSync(generatedFile).toString()
  const fixedFile = file.replace(RegExp(/(\bfrom\s+["']\..*)(["'])/g), '$1.js$2')
  writeFileSync(generatedFile, fixedFile)
}
