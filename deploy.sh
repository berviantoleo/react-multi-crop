#!/bin/sh
set -xe
# prepare env
export DISABLE_ESLINT_PLUGIN=true
export PUBLIC_URL="/"
export SKIP_PREFLIGHT_CHECK=true

# prepare yarn
corepack enable
corepack prepare yarn@stable --activate

# installation deps
yarn --immutable

# deploy examples
yarn lerna run build --scope @berviantoleo/react-multi-crop
yarn lerna run build --scope @berviantoleo/react-multi-crop-demo

# deploy docs
yarn docs:build
yarn lerna run docs --scope @berviantoleo/react-multi-crop