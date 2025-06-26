#!/usr/bin/env nu

print "Building..."
pnpm build
print "\nCreating source archive...\n"
rm -fp source.zip
^zip source.zip src .nvmrc esbuild.mjs package.json pnpm-lock.yaml README.md tsconfig.json
let credentials = open mozilla-credentials.json
print "\nSubmitting...\n"
(./node_modules/.bin/web-ext sign
    --source-dir dist
    --upload-source-code source.zip
    --channel unlisted
    --api-key $credentials.key
    --api-secret $credentials.secret)
