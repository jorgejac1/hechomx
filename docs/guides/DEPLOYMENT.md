# Documentation Deployment Guide

> How to build and deploy Papalote Market documentation.

## Table of Contents

1. [Local Development](#local-development)
2. [Building Documentation](#building-documentation)
3. [Deployment Options](#deployment-options)
4. [CI/CD Integration](#cicd-integration)

---

## Local Development

### Storybook (Component Explorer)

```bash
# Start Storybook dev server
npm run storybook
# Opens at http://localhost:6006
```

### TypeDoc (API Documentation)

```bash
# Generate API docs
npm run docs
# Output: docs/api/

# Watch mode
npm run docs:watch
```

---

## Building Documentation

### Build All Documentation

```bash
# Build both Storybook and TypeDoc
npm run docs:all
```

This creates:

- `storybook-static/` - Static Storybook build
- `docs/api/` - TypeDoc markdown files

### Build Individually

```bash
# Storybook only
npm run build-storybook
# Output: storybook-static/

# TypeDoc only
npm run docs
# Output: docs/api/
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

Deploy Storybook as a separate Vercel project:

1. Create a new Vercel project
2. Set build command: `npm run build-storybook`
3. Set output directory: `storybook-static`
4. Deploy

**vercel.json** for Storybook:

```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static"
}
```

### Option 2: GitHub Pages

1. Add to `.github/workflows/docs.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch

### Option 3: Netlify

1. Create new Netlify site
2. Configure build settings:
   - Build command: `npm run build-storybook`
   - Publish directory: `storybook-static`

**netlify.toml**:

```toml
[build]
  command = "npm run build-storybook"
  publish = "storybook-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 4: Chromatic (Storybook Cloud)

For visual testing and hosted Storybook:

```bash
# Install Chromatic
npm install --save-dev chromatic

# Add script
# package.json
"chromatic": "chromatic --project-token=<your-token>"
```

```bash
# Deploy to Chromatic
npx chromatic --project-token=<your-token>
```

---

## CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/storybook.yml`:

```yaml
name: Storybook

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: storybook
          path: storybook-static/
```

### Preview Deployments

For PR preview deployments with Vercel:

1. Link repository to Vercel
2. Create `vercel.json` for Storybook project
3. PRs automatically get preview URLs

---

## Directory Structure After Build

```
project/
├── storybook-static/     # Storybook build output
│   ├── index.html
│   ├── iframe.html
│   └── assets/
├── docs/
│   ├── api/              # TypeDoc output
│   │   ├── README.md
│   │   ├── components/
│   │   ├── contexts/
│   │   └── types/
│   ├── architecture/
│   ├── features/
│   └── guides/
└── ...
```

---

## Recommended Setup

For Papalote Market, we recommend:

1. **Main site**: Vercel at `papalotemarket.com`
2. **Storybook**: Vercel at `storybook.papalotemarket.com`
3. **Docs**: GitHub Pages or within main repo at `/docs`

### Subdomain Setup (Vercel)

```json
// vercel.json for Storybook subdomain
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "X-Frame-Options", "value": "SAMEORIGIN" }]
    }
  ]
}
```

---

## Troubleshooting

### Storybook Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules/.cache/storybook
npm run build-storybook
```

### TypeDoc Errors

```bash
# Skip error checking for faster builds
# typedoc.json
{
  "skipErrorChecking": true
}
```

### Missing Styles in Build

Ensure `globals.css` is imported in `.storybook/preview.ts`:

```ts
import '../app/globals.css';
```

---

_See also: [Contributing](./CONTRIBUTING.md) | [Folder Structure](./FOLDER-STRUCTURE.md)_
