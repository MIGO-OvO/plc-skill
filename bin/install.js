#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');

const packageDir = path.resolve(__dirname, '..');
const homeDir = os.homedir();
const agentsDir = path.join(homeDir, '.agents');
const skillsDir = path.join(agentsDir, 'skills');
const targetDir = path.join(skillsDir, 'plc-skill');
const stagingDir = path.join(skillsDir, '.plc-skill-staging');
const backupDir = path.join(skillsDir, '.plc-skill-backup');

const skipEntries = new Set([
  '.git',
  '.github',
  'bin',
  'node_modules',
  'package-lock.json',
  'package.json',
  'scripts',
]);

function removeIfExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyDirectorySync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (skipEntries.has(entry.name)) {
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

function installSkill() {
  fs.mkdirSync(skillsDir, { recursive: true });

  removeIfExists(stagingDir);
  removeIfExists(backupDir);

  copyDirectorySync(packageDir, stagingDir);

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
  console.log('\nInstalling plc-skill...');
  installSkill();
  console.log(`Installed plc-skill to: ${targetDir}`);
  console.log('Run your agent with the skill enabled from ~/.agents/skills/plc-skill.\n');
} catch (error) {
  console.error(`Failed to install plc-skill: ${error.message}`);
  process.exit(1);
}
