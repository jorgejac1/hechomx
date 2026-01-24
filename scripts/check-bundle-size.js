#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Bundle Size Checker
 * Analyzes Next.js build output and compares against performance budgets.
 * Run after `npm run build` to check bundle sizes.
 *
 * Usage: npm run bundle:check
 */

const fs = require('fs');
const path = require('path');

// Performance budgets (in KB) - UNCOMPRESSED file sizes
// Note: Gzipped sizes shown in Next.js build output are ~3-4x smaller
// These budgets are intentionally lenient for complex e-commerce apps
const BUDGETS = {
  // First Load JS budget per page (uncompressed)
  firstLoadJS: {
    warning: 500, // ~150KB gzipped
    error: 1000, // ~300KB gzipped
  },
  // Individual chunk budgets (uncompressed)
  chunks: {
    warning: 500, // ~150KB gzipped
    error: 1000, // ~300KB gzipped - allows for complex pages
  },
  // Total shared JS budget (uncompressed)
  sharedJS: {
    warning: 700,
    error: 1200,
  },
};

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

function getStatusIcon(size, budget) {
  const kb = size / 1024;
  if (kb > budget.error) return `${colors.red}✗${colors.reset}`;
  if (kb > budget.warning) return `${colors.yellow}⚠${colors.reset}`;
  return `${colors.green}✓${colors.reset}`;
}

function getStatusColor(size, budget) {
  const kb = size / 1024;
  if (kb > budget.error) return colors.red;
  if (kb > budget.warning) return colors.yellow;
  return colors.green;
}

async function analyzeBuild() {
  const buildDir = path.join(process.cwd(), '.next');

  if (!fs.existsSync(buildDir)) {
    console.error(
      `${colors.red}Error: .next directory not found. Run 'npm run build' first.${colors.reset}`
    );
    process.exit(1);
  }

  // Read build manifest
  const buildManifestPath = path.join(buildDir, 'build-manifest.json');
  const appBuildManifestPath = path.join(buildDir, 'app-build-manifest.json');

  let _buildManifest = {};
  let _appBuildManifest = {};

  if (fs.existsSync(buildManifestPath)) {
    _buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf-8'));
  }

  if (fs.existsSync(appBuildManifestPath)) {
    _appBuildManifest = JSON.parse(fs.readFileSync(appBuildManifestPath, 'utf-8'));
  }

  // Analyze static chunks
  const staticDir = path.join(buildDir, 'static');
  const chunksDir = path.join(staticDir, 'chunks');

  let totalSize = 0;
  let sharedSize = 0;
  const chunks = [];
  const warnings = [];
  const errors = [];

  console.log(`\n${colors.bold}${colors.cyan}📦 Bundle Size Analysis${colors.reset}\n`);
  console.log(
    `${colors.dim}─────────────────────────────────────────────────────${colors.reset}\n`
  );

  // Analyze chunk files
  if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir, { recursive: true });

    for (const file of files) {
      const filePath = path.join(chunksDir, file);
      if (fs.statSync(filePath).isFile() && file.endsWith('.js')) {
        const stats = fs.statSync(filePath);
        const size = stats.size;
        totalSize += size;

        // Check if it's a shared chunk (framework, commons, etc.)
        if (file.includes('framework') || file.includes('main') || file.includes('webpack')) {
          sharedSize += size;
        }

        chunks.push({ name: file, size });

        // Check against budget
        const kb = size / 1024;
        if (kb > BUDGETS.chunks.error) {
          errors.push(
            `Chunk ${file} (${formatSize(size)}) exceeds error budget of ${BUDGETS.chunks.error}KB`
          );
        } else if (kb > BUDGETS.chunks.warning) {
          warnings.push(
            `Chunk ${file} (${formatSize(size)}) exceeds warning budget of ${BUDGETS.chunks.warning}KB`
          );
        }
      }
    }
  }

  // Sort chunks by size (largest first)
  chunks.sort((a, b) => b.size - a.size);

  // Display top 10 largest chunks
  console.log(`${colors.bold}Top 10 Largest Chunks:${colors.reset}\n`);

  const topChunks = chunks.slice(0, 10);
  for (const chunk of topChunks) {
    const icon = getStatusIcon(chunk.size, BUDGETS.chunks);
    const color = getStatusColor(chunk.size, BUDGETS.chunks);
    const shortName = chunk.name.length > 40 ? `...${chunk.name.slice(-37)}` : chunk.name;
    console.log(
      `  ${icon} ${color}${formatSize(chunk.size).padStart(12)}${colors.reset}  ${shortName}`
    );
  }

  // Summary
  console.log(
    `\n${colors.dim}─────────────────────────────────────────────────────${colors.reset}\n`
  );
  console.log(`${colors.bold}Summary:${colors.reset}\n`);

  const sharedIcon = getStatusIcon(sharedSize, BUDGETS.sharedJS);
  const sharedColor = getStatusColor(sharedSize, BUDGETS.sharedJS);
  console.log(
    `  ${sharedIcon} Shared JS:     ${sharedColor}${formatSize(sharedSize)}${colors.reset} (budget: ${BUDGETS.sharedJS.warning}KB warning / ${BUDGETS.sharedJS.error}KB error)`
  );

  console.log(
    `  ${colors.blue}ℹ${colors.reset} Total JS:      ${colors.cyan}${formatSize(totalSize)}${colors.reset}`
  );
  console.log(
    `  ${colors.blue}ℹ${colors.reset} Total Chunks:  ${colors.cyan}${chunks.length}${colors.reset}`
  );

  // Check shared JS budget
  const sharedKb = sharedSize / 1024;
  if (sharedKb > BUDGETS.sharedJS.error) {
    errors.push(
      `Shared JS (${formatSize(sharedSize)}) exceeds error budget of ${BUDGETS.sharedJS.error}KB`
    );
  } else if (sharedKb > BUDGETS.sharedJS.warning) {
    warnings.push(
      `Shared JS (${formatSize(sharedSize)}) exceeds warning budget of ${BUDGETS.sharedJS.warning}KB`
    );
  }

  // Display warnings and errors
  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}${colors.bold}⚠ Warnings (${warnings.length}):${colors.reset}`);
    warnings.forEach((w) => console.log(`  ${colors.yellow}• ${w}${colors.reset}`));
  }

  if (errors.length > 0) {
    console.log(`\n${colors.red}${colors.bold}✗ Errors (${errors.length}):${colors.reset}`);
    errors.forEach((e) => console.log(`  ${colors.red}• ${e}${colors.reset}`));
  }

  // Recommendations
  console.log(
    `\n${colors.dim}─────────────────────────────────────────────────────${colors.reset}\n`
  );
  console.log(`${colors.bold}💡 Optimization Tips:${colors.reset}\n`);
  console.log(
    `  • Run ${colors.cyan}npm run analyze${colors.reset} to visualize bundle composition`
  );
  console.log(`  • Use ${colors.cyan}dynamic(() => import())${colors.reset} for heavy components`);
  console.log(
    `  • Check for duplicate dependencies with ${colors.cyan}npm ls <package>${colors.reset}`
  );
  console.log(`  • Consider code splitting for routes with large first-load JS`);

  console.log(
    `\n${colors.dim}─────────────────────────────────────────────────────${colors.reset}\n`
  );

  // Exit with error code if budget exceeded
  if (errors.length > 0) {
    console.log(
      `${colors.red}${colors.bold}Build failed: ${errors.length} budget(s) exceeded.${colors.reset}\n`
    );
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log(
      `${colors.yellow}${colors.bold}Build passed with ${warnings.length} warning(s).${colors.reset}\n`
    );
    process.exit(0);
  } else {
    console.log(`${colors.green}${colors.bold}✓ All budgets passed!${colors.reset}\n`);
    process.exit(0);
  }
}

analyzeBuild().catch((err) => {
  console.error(`${colors.red}Error analyzing build:${colors.reset}`, err);
  process.exit(1);
});
