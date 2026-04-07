#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const markdownRefPattern = /(?:^|[\s(`'"])((?:references|templates|docs|evals|examples|bin)\/[A-Za-z0-9._/-]+\.md)(?=$|[\s)`'",.\]])/gm;
const placeholderTokens = ['YOUR_USERNAME', 'Your repo URL'];
const ignoredDirs = new Set(['.git', '.github', 'node_modules']);

const issues = [];

function walk(dirPath, fileList = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, fileList);
      continue;
    }

    fileList.push(fullPath);
  }

  return fileList;
}

function toRelative(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, '/');
}

function recordIssue(message) {
  issues.push(message);
}

function verifyMarkdownReferences() {
  const markdownFiles = walk(rootDir).filter((filePath) => filePath.endsWith('.md'));

  for (const filePath of markdownFiles) {
    const relativePath = toRelative(filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    for (const token of placeholderTokens) {
      if (content.includes(token)) {
        recordIssue(`${relativePath}: contains placeholder text "${token}"`);
      }
    }

    for (const match of content.matchAll(markdownRefPattern)) {
      const ref = match[1];

      if (ref.includes('<') || ref.includes('>')) {
        continue;
      }

      const resolvedPath = path.join(rootDir, ref.replace(/\//g, path.sep));
      if (!fs.existsSync(resolvedPath)) {
        recordIssue(`${relativePath}: missing markdown reference ${ref}`);
      }
    }
  }
}

function normalizeMap(value) {
  return JSON.stringify(value || {}, Object.keys(value || {}).sort());
}

function verifyPackageMetadata() {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageLockPath = path.join(rootDir, 'package-lock.json');

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const lock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
  const lockRoot = (lock.packages && lock.packages['']) || {};

  if (pkg.license !== lockRoot.license) {
    recordIssue(`package metadata drift: package.json license "${pkg.license}" != package-lock.json license "${lockRoot.license}"`);
  }

  if (normalizeMap(pkg.dependencies) !== normalizeMap(lockRoot.dependencies)) {
    recordIssue('package metadata drift: root dependencies differ between package.json and package-lock.json');
  }

  if (normalizeMap(pkg.devDependencies) !== normalizeMap(lockRoot.devDependencies)) {
    recordIssue('package metadata drift: root devDependencies differ between package.json and package-lock.json');
  }
}

try {
  verifyMarkdownReferences();
  verifyPackageMetadata();

  if (issues.length > 0) {
    console.error('Repository verification failed:\n');
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log('Repository verification passed.');
} catch (error) {
  console.error(`Verification error: ${error.message}`);
  process.exit(1);
}
