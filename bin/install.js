#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');

const packageDir = path.resolve(__dirname, '..');
const homeDir = os.homedir();

const rootPayloadEntries = new Set([
  'AGENTS.md',
  'LICENSE',
  'SKILL.md',
  'examples',
  'references',
  'templates',
]);

const ignoredEntries = new Set(['.git', '.github', 'node_modules']);
const installTargets = {
  agents: {
    label: 'Agents',
    skillsDir: path.join(homeDir, '.agents', 'skills'),
  },
  'claude-code': {
    label: 'Claude Code',
    skillsDir: path.join(homeDir, '.claude', 'skills'),
  },
};

function printHelp() {
  console.log(`
Usage: install-plc-skill [--target agents|claude-code|both] [--dry-run]

Options:
  --target <target>  Install target. Defaults to agents.
  --dry-run          Show planned install paths without writing files.
  --help             Show this help message.
`);
}

function parseArgs(argv) {
  const options = {
    target: 'agents',
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--target') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('--target requires a value: agents, claude-code, or both');
      }

      options.target = value;
      index += 1;
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = arg.slice('--target='.length);
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (!['agents', 'claude-code', 'both'].includes(options.target)) {
    throw new Error(`Unsupported target "${options.target}". Use agents, claude-code, or both.`);
  }

  return options;
}

function resolveTargets(target) {
  if (target === 'both') {
    return [installTargets.agents, installTargets['claude-code']];
  }

  return [installTargets[target]];
}

function removeIfExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyDirectorySync(src, dest, isRoot = false) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredEntries.has(entry.name)) {
      continue;
    }

    if (isRoot && !rootPayloadEntries.has(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function describePayload() {
  return [...rootPayloadEntries].sort().join(', ');
}

function getTargetPaths(skillsDir) {
  return {
    targetDir: path.join(skillsDir, 'plc-skill'),
    stagingDir: path.join(skillsDir, '.plc-skill-staging'),
    backupDir: path.join(skillsDir, '.plc-skill-backup'),
  };
}

function installSkill(targetConfig, options) {
  const { targetDir, stagingDir, backupDir } = getTargetPaths(targetConfig.skillsDir);

  if (options.dryRun) {
    console.log(`[dry-run] ${targetConfig.label}: would install plc-skill to ${targetDir}`);
    console.log(`[dry-run] Runtime payload: ${describePayload()}`);
    return;
  }

  const skillsDir = targetConfig.skillsDir;
  fs.mkdirSync(skillsDir, { recursive: true });

  removeIfExists(stagingDir);
  removeIfExists(backupDir);

  copyDirectorySync(packageDir, stagingDir, true);

  let backupCreated = false;

  try {
    if (fs.existsSync(targetDir)) {
      fs.renameSync(targetDir, backupDir);
      backupCreated = true;
    }

    fs.renameSync(stagingDir, targetDir);
    removeIfExists(backupDir);
  } catch (error) {
    removeIfExists(stagingDir);

    if (backupCreated && !fs.existsSync(targetDir) && fs.existsSync(backupDir)) {
      fs.renameSync(backupDir, targetDir);
    }

    throw error;
  }
}

try {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  console.log(options.dryRun ? '\nChecking plc-skill install plan...' : '\nInstalling plc-skill...');

  for (const targetConfig of resolveTargets(options.target)) {
    installSkill(targetConfig, options);

    if (!options.dryRun) {
      const { targetDir } = getTargetPaths(targetConfig.skillsDir);
      console.log(`Installed plc-skill for ${targetConfig.label} to: ${targetDir}`);
    }
  }

  if (!options.dryRun) {
    console.log('Run your agent with the skill enabled from the installed skills directory.\n');
  }
} catch (error) {
  console.error(`Failed to install plc-skill: ${error.message}`);
  console.error('Run "install-plc-skill --help" for usage.');
  process.exit(1);
}
