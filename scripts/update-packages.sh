#!/bin/bash

echo "🔄 Updating root package dependencies..."
# Update root package dependencies
ncu -u

echo "📦 Updating individual package dependencies..."
echo "  ↳ Updating @docs.plus/demo..."
npx lerna exec --scope=@docs.plus/demo -- ncu -u
echo "  ↳ Updating @docs.plus/extension-hypermultimedia..."
npx lerna exec --scope=@docs.plus/extension-hypermultimedia -- ncu -u

echo "✨ All packages updated successfully!"
echo ""
echo -e "\033[1;33m⚠️  IMPORTANT: Please review manually the updated package versions in package.json files.\033[0m"
echo -e "\033[1;37m   Once you've verified there are no incompatible or unsupported versions,\033[0m"
echo -e "\033[1;37m   run the following command to install the new dependencies:\033[0m"
echo ""
echo -e "\033[1;32m   yarn reinstall:all-packages\033[0m"
echo ""
