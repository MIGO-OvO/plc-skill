#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const markdownRefPattern = /(?:^|[\s(`'"])((?:references|templates|docs|evals|examples|bin)\/[A-Za-z0-9._/-]+\.md)(?=$|[\s)`'",.\]])/gm;
const placeholderTokens = ['YOUR_USERNAME', 'Your repo URL'];
const ignoredDirs = new Set(['.git', '.github', 'node_modules']);
const maxSkillTriggerLength = 1024;
const expectedRuntimePayloadEntries = ['AGENTS.md', 'LICENSE', 'SKILL.md', 'examples', 'references', 'templates'];
const forbiddenRuntimePayloadEntries = [
  'README.md',
  'README.zh-CN.md',
  'INSTALL.md',
  'CONTRIBUTING.md',
  'SHOWCASE.md',
  'docs',
  'evals',
  'package.json',
  'package-lock.json',
  'scripts',
  'bin',
];
const mojibakePatterns = [
  { label: 'replacement character', pattern: /\uFFFD/ },
  { label: 'common mojibake sequence', pattern: /(?:\u9225|\u9239|\u00E2\u20AC|\u00C3|\u00C2)/ },
];
const vendorNamePattern = /\b(?:Mitsubishi|MELSEC|GX Works|FX3U|Siemens|TIA Portal|Rockwell|Allen-Bradley|Studio 5000|Omron|Sysmac|Beckhoff|TwinCAT|Schneider|Modicon|Codesys|CODESYS|Delta|Keyence|Panasonic)\b/;
const templateVendorContrastAllowlist = new Set([
  'templates/common/analog-scaling-template.md',
  'templates/common/pid-control-template.md',
]);
const restrictedCommonBiasFiles = [
  'references/common/alarm-and-interlock-patterns.md',
  'references/common/knowledge-priority.md',
  'references/common/plcopen-and-iec-notes.md',
];

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

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function stripYamlQuotes(value) {
  const trimmed = value.trim();
  const quote = trimmed[0];

  if ((quote === '"' || quote === "'") && trimmed.endsWith(quote)) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseSkillFrontmatter(rawFrontmatter) {
  const result = {};
  const lines = rawFrontmatter.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue = ''] = match;
    const value = rawValue.trim();

    if (value === '|' || value === '>') {
      const blockLines = [];
      index += 1;

      while (index < lines.length && /^(?:\s+|$)/.test(lines[index])) {
        blockLines.push(lines[index].replace(/^\s{2}/, ''));
        index += 1;
      }

      index -= 1;
      result[key] = value === '>' ? blockLines.join(' ').trim() : blockLines.join('\n').trim();
      continue;
    }

    result[key] = stripYamlQuotes(value);
  }

  return result;
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

function verifySkillFrontmatter() {
  const skillPath = path.join(rootDir, 'SKILL.md');
  const content = fs.readFileSync(skillPath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    recordIssue('SKILL.md: missing YAML frontmatter');
    return;
  }

  const frontmatter = parseSkillFrontmatter(match[1]);

  if (frontmatter.name !== 'plc-skill') {
    recordIssue('SKILL.md: frontmatter name must be "plc-skill"');
  }

  if (typeof frontmatter.description !== 'string' || frontmatter.description.trim().length === 0) {
    recordIssue('SKILL.md: frontmatter description must be a non-empty string');
  }

  if (typeof frontmatter.when_to_use !== 'string' || frontmatter.when_to_use.trim().length === 0) {
    recordIssue('SKILL.md: frontmatter when_to_use must be a non-empty string for Claude Code routing');
  }

  const triggerLength = `${frontmatter.description || ''} ${frontmatter.when_to_use || ''}`.trim().length;
  if (triggerLength > maxSkillTriggerLength) {
    recordIssue(`SKILL.md: combined description + when_to_use length ${triggerLength} exceeds ${maxSkillTriggerLength}`);
  }

  for (const forbiddenKey of ['allowed-tools', 'context', 'disable-model-invocation']) {
    if (Object.prototype.hasOwnProperty.call(frontmatter, forbiddenKey)) {
      recordIssue(`SKILL.md: frontmatter must not include ${forbiddenKey}`);
    }
  }
}

function parseInstallerRuntimeEntries() {
  const installer = readText('bin/install.js');
  const match = installer.match(/const rootPayloadEntries = new Set\(\[([\s\S]*?)\]\);/);

  if (!match) {
    recordIssue('bin/install.js: unable to find rootPayloadEntries runtime payload declaration');
    return [];
  }

  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((entryMatch) => entryMatch[1]).sort();
}

function verifyRuntimePayload() {
  const actualEntries = parseInstallerRuntimeEntries();
  const expectedEntries = [...expectedRuntimePayloadEntries].sort();

  if (JSON.stringify(actualEntries) !== JSON.stringify(expectedEntries)) {
    recordIssue(`bin/install.js: runtime payload entries must be exactly ${expectedEntries.join(', ')}`);
  }

  for (const forbiddenEntry of forbiddenRuntimePayloadEntries) {
    if (actualEntries.includes(forbiddenEntry)) {
      recordIssue(`bin/install.js: runtime payload must not include ${forbiddenEntry}`);
    }
  }
}

function verifyTextEncoding() {
  const textFiles = walk(rootDir).filter((filePath) => /\.(md|js|json)$/i.test(filePath));

  for (const filePath of textFiles) {
    const relativePath = toRelative(filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    for (const { label, pattern } of mojibakePatterns) {
      if (pattern.test(content)) {
        recordIssue(`${relativePath}: contains ${label}`);
      }
    }
  }
}

function verifyCommonLayerVendorBias() {
  const commonTemplateFiles = walk(path.join(rootDir, 'templates', 'common')).filter((filePath) => filePath.endsWith('.md'));

  for (const filePath of commonTemplateFiles) {
    const relativePath = toRelative(filePath);
    if (templateVendorContrastAllowlist.has(relativePath)) {
      continue;
    }

    if (vendorNamePattern.test(fs.readFileSync(filePath, 'utf8'))) {
      recordIssue(`${relativePath}: common template contains vendor-specific wording outside the contrast allowlist`);
    }
  }

  for (const relativePath of restrictedCommonBiasFiles) {
    const fullPath = path.join(rootDir, relativePath);
    if (fs.existsSync(fullPath) && vendorNamePattern.test(fs.readFileSync(fullPath, 'utf8'))) {
      recordIssue(`${relativePath}: restricted common reference contains vendor-specific wording`);
    }
  }
}

function readEvalMatrixCaseIds() {
  const content = readText('evals/eval-matrix.md');
  const ids = [];

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\|\s*([A-Z]+[0-9]+)\s*\|/);
    if (match && match[1] !== 'Case') {
      ids.push(match[1]);
    }
  }

  return ids;
}

function verifyEvalJson() {
  const triggerPath = path.join(rootDir, 'evals', 'trigger-queries.json');
  const evalsPath = path.join(rootDir, 'evals', 'evals.json');

  if (!fs.existsSync(triggerPath)) {
    recordIssue('evals/trigger-queries.json: missing machine-readable trigger eval file');
  } else {
    const triggerQueries = readJson('evals/trigger-queries.json');
    for (const groupName of ['should_trigger', 'should_not_trigger']) {
      const group = triggerQueries[groupName];
      if (!Array.isArray(group) || group.length === 0) {
        recordIssue(`evals/trigger-queries.json: ${groupName} must be a non-empty array`);
        continue;
      }

      for (const entry of group) {
        if (!entry.id || !entry.prompt) {
          recordIssue(`evals/trigger-queries.json: ${groupName} entries require id and prompt`);
        }
      }
    }
  }

  if (!fs.existsSync(evalsPath)) {
    recordIssue('evals/evals.json: missing machine-readable behavior eval file');
    return;
  }

  const evals = readJson('evals/evals.json');
  if (!Array.isArray(evals)) {
    recordIssue('evals/evals.json: root value must be an array');
    return;
  }

  const ids = new Set();
  for (const evalCase of evals) {
    if (!evalCase.id || !evalCase.prompt || !evalCase.expected_output || !Array.isArray(evalCase.assertions) || evalCase.assertions.length === 0) {
      recordIssue('evals/evals.json: every entry requires id, prompt, expected_output, and non-empty assertions');
      continue;
    }

    ids.add(evalCase.id);
  }

  for (const matrixId of readEvalMatrixCaseIds()) {
    if (!ids.has(matrixId)) {
      recordIssue(`evals/evals.json: missing case ${matrixId} from evals/eval-matrix.md`);
    }
  }
}

try {
  verifyMarkdownReferences();
  verifyPackageMetadata();
  verifySkillFrontmatter();
  verifyRuntimePayload();
  verifyTextEncoding();
  verifyCommonLayerVendorBias();
  verifyEvalJson();

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
