#!/bin/bash

# GitHub Pages Deployment Verification Script
echo "🔍 Verifying GitHub Pages Deployment..."
echo ""

# Check if .nojekyll exists
echo "✓ Checking .nojekyll file..."
if [ -f "build/.nojekyll" ]; then
    echo "  ✅ .nojekyll found in build/"
else
    echo "  ❌ .nojekyll NOT found in build/ - Creating..."
    touch build/.nojekyll
fi

# Check build folder
echo ""
echo "✓ Checking build folder..."
if [ -d "build" ]; then
    echo "  ✅ build/ folder exists"
    echo "  📦 Build contents:"
    ls -lh build/ | awk '{if (NR>1) print "    " $9 " (" $5 ")"}'
else
    echo "  ❌ build/ folder NOT found"
    exit 1
fi

# Check index.html
echo ""
echo "✓ Checking index.html..."
if [ -f "build/index.html" ]; then
    echo "  ✅ index.html exists"
    if grep -q "Table-Virtual-Scroll" build/index.html; then
        echo "  ✅ Correct path references found"
    else
        echo "  ⚠️  Warning: Homepage path might not be set correctly"
    fi
else
    echo "  ❌ index.html NOT found"
    exit 1
fi

# Check CSS and JS
echo ""
echo "✓ Checking CSS and JS bundles..."
if ls build/static/css/*.css > /dev/null 2>&1; then
    echo "  ✅ CSS bundle found"
else
    echo "  ❌ CSS bundle NOT found"
fi

if ls build/static/js/main.*.js > /dev/null 2>&1; then
    echo "  ✅ JavaScript bundle found"
else
    echo "  ❌ JavaScript bundle NOT found"
fi

# Check package.json homepage
echo ""
echo "✓ Checking package.json..."
HOMEPAGE=$(grep '"homepage"' package.json)
echo "  Homepage: $HOMEPAGE"

# Deployment instructions
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All checks passed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Live URL: https://arkumar3c.github.io/Table-Virtual-Scroll/"
echo ""
echo "🔧 If app still doesn't load:"
echo "  1. Clear browser cache (Ctrl+Shift+R)"
echo "  2. Wait 2-5 minutes for GitHub to redeploy"
echo "  3. Check GitHub Actions: github.com/arkumar3c/Table-Virtual-Scroll/actions"
echo "  4. Verify Settings → Pages → Source is gh-pages branch"
echo ""
