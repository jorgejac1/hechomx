#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Performance Audit Script
 * Analyzes Next.js build output for performance issues and provides recommendations.
 *
 * Usage: npm run perf:audit
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function _formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function runAudit() {
  const buildDir = path.join(process.cwd(), '.next');

  if (!fs.existsSync(buildDir)) {
    console.error(
      `${colors.red}Error: .next directory not found. Run 'npm run build' first.${colors.reset}`
    );
    process.exit(1);
  }

  console.log(`\n${colors.bold}${colors.magenta}🔍 Performance Audit${colors.reset}\n`);
  console.log(
    `${colors.dim}═══════════════════════════════════════════════════════${colors.reset}\n`
  );

  const _issues = [];
  const recommendations = [];
  let score = 100;

  // 1. Check for large dependencies in node_modules
  console.log(`${colors.bold}1. Dependency Analysis${colors.reset}\n`);

  const largeDeps = [
    { name: 'moment', alternative: 'date-fns or dayjs', impact: 'high' },
    { name: 'lodash', alternative: 'lodash-es with tree-shaking', impact: 'medium' },
    { name: 'axios', alternative: 'native fetch (already available)', impact: 'low' },
    { name: '@mui/material', alternative: 'Tailwind (already using)', impact: 'high' },
    { name: 'antd', alternative: 'Tailwind (already using)', impact: 'high' },
  ];

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  let foundLargeDeps = false;
  for (const dep of largeDeps) {
    if (allDeps[dep.name]) {
      foundLargeDeps = true;
      const impactColor =
        dep.impact === 'high' ? colors.red : dep.impact === 'medium' ? colors.yellow : colors.blue;
      console.log(
        `  ${colors.yellow}⚠${colors.reset} Found ${colors.bold}${dep.name}${colors.reset} - Consider: ${dep.alternative} (${impactColor}${dep.impact} impact${colors.reset})`
      );
      if (dep.impact === 'high') score -= 10;
      else if (dep.impact === 'medium') score -= 5;
    }
  }

  if (!foundLargeDeps) {
    console.log(`  ${colors.green}✓${colors.reset} No problematic large dependencies found`);
  }

  // 2. Check image optimization
  console.log(`\n${colors.bold}2. Image Optimization${colors.reset}\n`);

  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfig = fs.readFileSync(nextConfigPath, 'utf-8');

    if (nextConfig.includes('image/avif')) {
      console.log(`  ${colors.green}✓${colors.reset} AVIF format enabled (best compression)`);
    } else {
      console.log(
        `  ${colors.yellow}⚠${colors.reset} Consider enabling AVIF format for better compression`
      );
      score -= 5;
    }

    if (nextConfig.includes('image/webp')) {
      console.log(`  ${colors.green}✓${colors.reset} WebP format enabled`);
    }

    if (nextConfig.includes('minimumCacheTTL')) {
      console.log(`  ${colors.green}✓${colors.reset} Image caching configured`);
    } else {
      console.log(
        `  ${colors.yellow}⚠${colors.reset} Consider adding minimumCacheTTL for image caching`
      );
      score -= 3;
    }
  }

  // 3. Check for dynamic imports usage
  console.log(`\n${colors.bold}3. Code Splitting${colors.reset}\n`);

  const srcDirs = ['app', 'components', 'lib'];
  let dynamicImportCount = 0;
  let totalComponentFiles = 0;

  for (const dir of srcDirs) {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const files = getAllFiles(dirPath, ['.tsx', '.ts', '.jsx', '.js']);
      totalComponentFiles += files.length;

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('dynamic(') || content.includes("import('")) {
          dynamicImportCount++;
        }
      }
    }
  }

  const dynamicRatio = ((dynamicImportCount / totalComponentFiles) * 100).toFixed(1);
  console.log(
    `  ${colors.blue}ℹ${colors.reset} Dynamic imports found in ${dynamicImportCount} of ${totalComponentFiles} files (${dynamicRatio}%)`
  );

  if (dynamicImportCount >= 5) {
    console.log(`  ${colors.green}✓${colors.reset} Good use of code splitting`);
  } else {
    console.log(
      `  ${colors.yellow}⚠${colors.reset} Consider using more dynamic imports for heavy components`
    );
    recommendations.push('Use dynamic(() => import()) for components not needed on initial render');
    score -= 5;
  }

  // 4. Check static vs dynamic routes
  console.log(`\n${colors.bold}4. Route Analysis${colors.reset}\n`);

  const routesManifest = path.join(buildDir, 'routes-manifest.json');
  if (fs.existsSync(routesManifest)) {
    const routes = JSON.parse(fs.readFileSync(routesManifest, 'utf-8'));

    const staticRoutes = routes.staticRoutes?.length || 0;
    const dynamicRoutes = routes.dynamicRoutes?.length || 0;

    console.log(`  ${colors.blue}ℹ${colors.reset} Static routes: ${staticRoutes}`);
    console.log(`  ${colors.blue}ℹ${colors.reset} Dynamic routes: ${dynamicRoutes}`);

    if (staticRoutes > 0) {
      console.log(`  ${colors.green}✓${colors.reset} Using static generation where possible`);
    }
  }

  // 5. Check for console.log in production
  console.log(`\n${colors.bold}5. Production Readiness${colors.reset}\n`);

  const nextConfigContent = fs.existsSync(nextConfigPath)
    ? fs.readFileSync(nextConfigPath, 'utf-8')
    : '';

  if (nextConfigContent.includes('removeConsole')) {
    console.log(`  ${colors.green}✓${colors.reset} Console removal configured for production`);
  } else {
    console.log(
      `  ${colors.yellow}⚠${colors.reset} Consider removing console.log in production builds`
    );
    recommendations.push('Add compiler.removeConsole to next.config.js for production');
    score -= 3;
  }

  // 6. PWA Check
  console.log(`\n${colors.bold}6. PWA Configuration${colors.reset}\n`);

  const manifestPath = path.join(process.cwd(), 'public', 'site.webmanifest');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    console.log(`  ${colors.green}✓${colors.reset} Web manifest found`);

    if (manifest.icons?.length >= 2) {
      console.log(
        `  ${colors.green}✓${colors.reset} Multiple icon sizes configured (${manifest.icons.length} icons)`
      );
    }

    if (manifest.shortcuts?.length > 0) {
      console.log(`  ${colors.green}✓${colors.reset} App shortcuts configured`);
    }

    if (manifest.display === 'standalone') {
      console.log(`  ${colors.green}✓${colors.reset} Standalone display mode enabled`);
    }
  } else {
    console.log(`  ${colors.red}✗${colors.reset} Web manifest not found - PWA not configured`);
    score -= 10;
  }

  // Final Score
  console.log(
    `\n${colors.dim}═══════════════════════════════════════════════════════${colors.reset}\n`
  );

  const scoreColor = score >= 80 ? colors.green : score >= 60 ? colors.yellow : colors.red;
  const scoreEmoji = score >= 80 ? '🎉' : score >= 60 ? '👍' : '⚠️';

  console.log(
    `${colors.bold}Performance Score: ${scoreColor}${score}/100${colors.reset} ${scoreEmoji}\n`
  );

  // Recommendations
  if (recommendations.length > 0) {
    console.log(`${colors.bold}📋 Recommendations:${colors.reset}\n`);
    recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
  }

  // Quick wins
  console.log(`\n${colors.bold}⚡ Quick Wins:${colors.reset}\n`);
  console.log(`  • Run ${colors.cyan}npm run analyze${colors.reset} to see bundle visualization`);
  console.log(`  • Run ${colors.cyan}npm run bundle:check${colors.reset} to check against budgets`);
  console.log(`  • Use Chrome DevTools Lighthouse for full audit`);
  console.log(`  • Test on slow 3G to identify performance bottlenecks`);

  console.log(
    `\n${colors.dim}═══════════════════════════════════════════════════════${colors.reset}\n`
  );
}

function getAllFiles(dir, extensions) {
  const files = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules, .next, etc.
        if (!['node_modules', '.next', '.git', 'storybook-static'].includes(item)) {
          walk(fullPath);
        }
      } else if (stat.isFile()) {
        if (extensions.some((ext) => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return files;
}

runAudit().catch((err) => {
  console.error(`${colors.red}Error running audit:${colors.reset}`, err);
  process.exit(1);
});
