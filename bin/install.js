#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const packageDir = path.resolve(__dirname, '..');
const homeDir = os.homedir();
const agentsDir = path.join(homeDir, '.agents');
const skillsDir = path.join(agentsDir, 'skills');
const targetDir = path.join(skillsDir, 'plc-skill');

function copyDirectorySync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'bin' || entry.name === 'package.json' || entry.name === 'package-lock.json') {
            continue;
        }

        if (entry.isDirectory()) {
            copyDirectorySync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    console.log('\n📦 Installing plc-skill...');
    
    if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
    }
    if (!fs.existsSync(skillsDir)) {
        fs.mkdirSync(skillsDir, { recursive: true });
    }

    copyDirectorySync(packageDir, targetDir);

    console.log('✅ plc-skill successfully installed to: ' + targetDir);
    console.log('💡 You can now use it in Oh My OpenCode or other supported agents!\n');
} catch (error) {
    console.error('❌ Failed to install plc-skill:', error.message);
    process.exit(1);
}
