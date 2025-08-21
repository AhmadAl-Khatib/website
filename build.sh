#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="public"

echo "Cleaning output folder..."
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "Copying main site files (excluding blog source) ..."
rsync -a --delete --exclude 'blog' ./ "$OUT_DIR/"

echo "Building Jekyll blog into /blog ..."
cd blog
bundle config set --local path vendor/bundle
bundle install
JEKYLL_ENV=production bundle exec jekyll build \
  --source . \
  --destination "../$OUT_DIR/blog" \
  --baseurl /blog
cd ..

echo "✅ Build finished. Final site is in $OUT_DIR"
